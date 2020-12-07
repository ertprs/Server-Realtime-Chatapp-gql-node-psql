const { UserInputError, AuthenticationError } = require("apollo-server");
const { Op } = require("sequelize");
const { Message, User } = require("../../models");

module.exports = {
  Query: {
    getMessages: async (parent, { from }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError("Unauthenticated");
        }
        const otherUser = await User.findOne({ where: { username: from } });
        if (!otherUser) {
          throw new UserInputError("user not found");
        }

        const usernames = [user.username, otherUser.username];

        const messages = await Message.findAll({
          where: {
            from: { [Op.in]: usernames },
            to: { [Op.in]: usernames },
          },
          order: [["createdAt", "DESC"]],
        });
        return messages;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { to, content }, { user }) => {
      try {
        //check if user is authenticated
        if (!user) {
          throw new AuthenticationError("Unauthenticated");
        }
        const recipient = await User.findOne({ where: { username: to } });
        if (!recipient) {
          //check if destination user exists
          throw new UserInputError("User not found");
        } else if (recipient.username === user.username) {
          throw new UserInputError("Can't message yourself");
        }

        if (content.trim() === "") {
          throw new UserInputError("Message can't empty");
        }
        const message = await Message.create({
          from: user.username,
          to: to,
          content: content,
        });
        return message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
