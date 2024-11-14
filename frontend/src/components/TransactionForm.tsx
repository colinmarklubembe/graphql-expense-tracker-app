import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

const TransactionForm = () => {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [
      "GetTransactions",
      "GetTransactionStatistics",
      "GetUserAndTransactions",
    ],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const transactionData = {
      description: formData.get("description"),
      paymentType: formData.get("paymentType"),
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount") as string) || 0,
      location: formData.get("location"),
      date: formData.get("date"),
    };

    try {
      await createTransaction({
        variables: {
          input: transactionData,
        },
      });

      form.reset();
      toast.success("Transaction added successfully");
    } catch (error) {
      console.error("Error: ", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <form
      className="w-full max-w-xl flex flex-col gap-5 px-6 py-8 bg-gray-200 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      {/* TRANSACTION */}
      <div className="flex flex-wrap">
        <div className="w-full mb-4">
          <label
            className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
            htmlFor="description"
          >
            Transaction
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
            id="description"
            name="description"
            type="text"
            required
            placeholder="Rent, Groceries, Salary, etc."
          />
        </div>
      </div>

      {/* PAYMENT TYPE */}
      <div className="flex flex-wrap gap-3">
        <div className="w-full flex-1 mb-4">
          <label
            className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
            htmlFor="paymentType"
          >
            Payment Type
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
              id="paymentType"
              name="paymentType"
            >
              <option>-- select --</option>
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
        <div className="w-full flex-1 mb-4">
          <label
            className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
              id="category"
              name="category"
            >
              <option>-- select --</option>
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
        <div className="w-full flex-1 mb-4">
          <label
            className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Amount ($)
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
            id="amount"
            name="amount"
            type="number"
            placeholder="150"
          />
        </div>
      </div>

      {/* LOCATION */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="w-full flex-1">
          <label
            className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
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
          />
        </div>

        {/* DATE */}
        <div className="w-full flex-1">
          <label
            className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        className="text-white font-semibold w-full rounded-lg px-4 py-3 bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
        disabled={loading}
        type="submit"
      >
        {loading ? "Loading..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
