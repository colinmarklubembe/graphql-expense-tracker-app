import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Transaction } from "@/components/Cards";
import { formatDate } from "@/lib/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

const categoryColorMap: { [key: string]: string } = {
  saving: "from-teal-600 to-green-400",
  expense: "from-purple-600 to-pink-400",
  investment: "from-blue-700 to-cyan-400",
};

type User = {
  profilePicture: string;
};

interface CardProps {
  transaction: Transaction;
  authUser: User;
}

const Card = ({ transaction, authUser }: CardProps) => {
  let { category, description, paymentType } = transaction;
  const { amount, date, location } = transaction;

  const cardClass = categoryColorMap[category];
  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0].toUpperCase() + category.slice(1);
  paymentType = paymentType[0].toUpperCase() + paymentType.slice(1);

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [
      "GetTransactions",
      "GetTransactionStatistics",
      "GetUserAndTransactions",
    ],
  });

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          transactionId: transaction._id,
        },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error: ", error);
      toast.error((error as Error).message);
    }
  };

  const formattedDate = formatDate(date);

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{category}</h2>
          <div className="flex items-center gap-2">
            {!loading ? (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            ) : (
              <div className="w-5 h-5 border-t-2 rounded-full animate-spin"></div>
            )}
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {location || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{formattedDate}</p>
          <img
            src={authUser?.profilePicture}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
