import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Transaction from "../models/transaction.model.js";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { name, gender, password, username } = input;

        if (!username || !password || !name || !gender) {
          throw new Error("All fields are required! Please fill in all fields");
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar.iran.liara.run/public/57
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture:
            gender === "male" ? boyProfilePicture : girlProfilePicture,
        });

        await newUser.save();
        await context.login(newUser);

        return newUser;
      } catch (error) {
        console.error("Error in signUp: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;

        if (!username || !password) throw new Error("All fields are required!");

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);

        return user;
      } catch (error) {
        console.log("Error in login: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((error) => {
          if (error) {
            throw error;
          }
        });
        context.res.clearCookie("connect.sid");

        return { message: "Successfully logged out" };
      } catch (error) {
        console.log("Error in logout: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();

        return user;
      } catch (error) {
        console.log("Error in authUser: ", error);
        throw new Error(error.message || "Error getting authenticated user");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.log("Error in user: ", error);
        throw new Error(error.message || "Error getting user");
      }
    },
  },
  User: {
    transactions: async (parent) => {
      try {
        console.log("parent: ", parent);
        const transactions = await Transaction.find({ userId: parent._id });

        return transactions;
      } catch (error) {
        console.log("Error in User.transactions: ", error);
        throw new Error(error.message || "Error getting transactions");
      }
    },
  },
};

export default userResolver;
