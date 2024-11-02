import passport from "passport";
import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser", user);
    done(null, user._id);
  });

  passport.deserializeUser(async (userId, done) => {
    console.log("deserializeUser", userId);
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid username or password");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid username or password");
        }

        console.log("user", user);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
