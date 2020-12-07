const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env.json");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      // console.log(context.req.headers);

      try {
        if (!user) {
          throw new AuthenticationError("Unauthenticated");
        }
        const users = await User.findAll({
          where: { username: { [Op.ne]: user.username } },
        });
        return users;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};
      try {
        if (username.trim() === "") {
          errors.username = "Username can't be empty";
        }

        if (password === "") {
          errors.password = "Password can't be empty";
        }

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad input", { errors: errors });
        }

        const user = await User.findOne({
          where: { username: username },
        });

        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("user not found", { errors: errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "password is incorrect";
          throw new UserInputError("password is incorrect", {
            errors: errors,
          });
        }

        const token = jwt.sign({ username: username }, JWT_SECRET, {
          expiresIn: 60 * 60,
        });

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        //TODO: validate input data
        if (username.trim() === "") {
          errors.username = "Username must not be empty";
        }
        if (email.trim() === "") {
          errors.email = "Email must not be empty";
        }
        if (password.trim() === "") {
          errors.password = "Password must not be empty";
        }
        if (confirmPassword.trim() === "") {
          errors.confirmPassword = "Confirmed password must not be empty";
        }

        if (password !== confirmPassword) {
          errors.confirmPassword = "Passwords must match";
        }
        // //TODO: check if username/email already exist
        // const userByUserName = await User.findOne({
        //   where: { username: username },
        // });
        // const userByEmail = await User.findOne({ where: { email: email } });

        // if (userByUserName) {
        //   errors.username = "Username is taken";
        // }
        // if (userByEmail) {
        //   errors.email = "Email is taken";
        // }

        if (Object.keys(errors).length > 0) {
          throw errors;
        }
        //TODO: hash password
        password = await bcrypt.hash(password, 6);
        //TODO: create user if valid
        const user = await User.create({
          username: username,
          email: email,
          password: password,
        });
        //TODO: return user after creation
        return user;
      } catch (err) {
        console.log("logged err " + err);
        if (err.name === "SequelizeUniqueConstraintError") {
          err.errors.forEach((e) => {
            errors[e.path] = `${e.path} is already taken!`;
          });
        } else if (err.name === "SequelizeValidationError") {
          err.errors.forEach((e) => {
            errors[e.path] = e.message;
          });
        }
        throw new UserInputError("bad input", { errors });
      }
    },
  },
};
