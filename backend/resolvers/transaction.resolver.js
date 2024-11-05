import Transaction from "../models/transaction.model.js";

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
    // TODO: ADD TRANSACTION/USER TRANSACTION DELETE MUTATION
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
    // TODO: ADD CATEGORY STATISTICS QUERY
  },
};

export default transactionResolver;
