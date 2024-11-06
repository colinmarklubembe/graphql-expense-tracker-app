import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthenticated");

        const userId = context.getUser()._id;
        const transaction = new Transaction({ ...input, userId });

        await transaction.save();

        return transaction;
      } catch (error) {
        console.error("Error creating transaction: ", error);
        throw new Error("Error creating transaction");
      }
    },

    updateTransaction: async (_, { input }) => {
      try {
        const { transactionId, ...update } = input;

        const transaction = await Transaction.findByIdAndUpdate(
          transactionId,
          update,
          { new: true }
        );

        return transaction;
      } catch (error) {
        console.error("Error updating transaction: ", error);
        throw new Error("Error updating transaction");
      }
    },

    deleteTransaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findByIdAndDelete(transactionId);

        return transaction;
      } catch (error) {
        console.error("Error deleting transaction: ", error);
        throw new Error("Error deleting transaction");
      }
    },
  },
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthenticated");

        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });

        return transactions;
      } catch (error) {
        console.error("Error fetching transactions: ", error);
        throw new Error("Error fetching transactions");
      }
    },

    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);

        return transaction;
      } catch (error) {
        console.error("Error fetching transaction: ", error);
        throw new Error("Error fetching transaction");
      }
    },
    categoryStatistics: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthenticated");

        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        const categoryMap = {};

        transactions.forEach((transaction) => {
          if (!categoryMap[transaction.category]) {
            categoryMap[transaction.category] = 0;
          }

          categoryMap[transaction.category] += transaction.amount;
        });

        return Object.entries(categoryMap).map(([category, totalAmount]) => ({
          category,
          totalAmount,
        }));
      } catch (error) {
        console.error("Error fetching category statistics: ", error);
        throw new Error("Error fetching category statistics");
      }
    },
  },
  Transaction: {
    user: async (parent) => {
      try {
        const user = await User.findById(parent.userId);

        return user;
      } catch (error) {
        console.error("Error fetching user: ", error);
        throw new Error("Error fetching user");
      }
    },
  },
};

export default transactionResolver;
