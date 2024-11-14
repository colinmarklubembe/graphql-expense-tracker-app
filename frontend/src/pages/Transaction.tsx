import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { UPDATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION } from "@/graphql/queries/transaction.query";
import toast from "react-hot-toast";
import TransactionFormSkeleton from "@/components/skeletons/TransactionFormSkeleton";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_TRANSACTION, {
    variables: { transactionId: id },
  });

  console.log("transaction data: ", data);

  const [updateTransaction, { loading: updating }] = useMutation(
    UPDATE_TRANSACTION,
    {
      refetchQueries: [
        "GetTransactions",
        "GetTransactionStatistics",
        "GetUserAndTransactions",
      ],
    }
  );

  const [formData, setFormData] = useState({
    description: data?.transaction.description || "",
    paymentType: "",
    category: "",
    amount: data?.transaction.amount || "",
    location: data?.transaction.location || "",
    date: data?.transaction.date || "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        description: data.transaction.description,
        paymentType: data.transaction.paymentType,
        category: data.transaction.category,
        amount: data.transaction.amount,
        location: data.transaction.location,
        date: new Date(+data.transaction.date).toISOString().substring(0, 10),
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);

    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            amount,
            transactionId: id,
          },
        },
      });
      toast.success("Transaction updated successfully");

      navigate("/");
    } catch (error) {
      console.log("Error updating transaction", error);
      toast.error("Error updating transaction");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) return <TransactionFormSkeleton />;

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center z-50 p-6">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 bg-gradient-to-r from-blue-600 via-green-500 to-blue-400 inline-block text-transparent bg-clip-text">
        Update this transaction
      </p>
      <form
        className="w-full max-w-xl flex flex-col gap-7 px-6 py-8 bg-gray-200 rounded-lg shadow-lg relative z-50"
        onSubmit={handleSubmit}
      >
        {/* TRANSACTION */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Transaction
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
              id="description"
              name="description"
              type="text"
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* PAYMENT TYPE */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="paymentType"
            >
              Payment Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
                id="paymentType"
                name="paymentType"
                onChange={handleInputChange}
                defaultValue={data?.transaction.paymentType || ""}
              >
                <option value="card">Card</option>
                <option value="cash">Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
                id="category"
                name="category"
                onChange={handleInputChange}
                defaultValue={data?.transaction.category || ""}
              >
                <option value="saving">Saving</option>
                <option value="expense">Expense</option>
                <option value="investment">Investment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="amount"
            >
              Amount($)
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
              id="amount"
              name="amount"
              type="number"
              placeholder="150"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
              id="location"
              name="location"
              type="text"
              placeholder="New York"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          {/* DATE */}
          <div className="w-full flex-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
              placeholder="Select date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="text-white font-bold w-full rounded-lg px-4 py-3 bg-gradient-to-br from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition duration-200"
          type="submit"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default TransactionPage;
