import Card from "./Card";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_AND_TRANSACTIONS,
} from "@/graphql/queries/user.query";

export interface Transaction {
  _id: string;
  userId: string;
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location: string;
  date: string;
}

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
  const { data: userTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
    skip: !authUser?.authUser?._id,
    variables: { userId: authUser?.authUser?._id },
  });

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10 text-white">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          userTransactions?.user?.transactions.map(
            (transaction: Transaction) => (
              <Card
                key={transaction._id}
                transaction={transaction}
                authUser={authUser?.authUser}
              />
            )
          )}
      </div>
      {!loading && userTransactions?.user?.transactions.length === 0 && (
        <p className="text-white text-center">No transaction history found</p>
      )}
    </div>
  );
};
export default Cards;
