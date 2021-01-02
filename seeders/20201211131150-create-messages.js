"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("messages", [
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3590",
        content: "Hey Jane!",
        from: "john",
        to: "jane",
        createdAt: "2020-07-01 07:00:00",
        updatedAt: "2020-07-01 07:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3591",
        content: "Hey John, how's it going?",
        from: "jane",
        to: "john",
        createdAt: "2020-07-01 08:00:00",
        updatedAt: "2020-07-01 08:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3592",
        content: "Not too bad, just getting to work, you?",
        from: "john",
        to: "jane",
        createdAt: "2020-07-01 09:00:00",
        updatedAt: "2020-07-01 09:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3593",
        content: "I'm working from home now",
        from: "jane",
        to: "john",
        createdAt: "2020-07-01 10:00:00",
        updatedAt: "2020-07-01 10:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3594",
        content: "That's cool! I'm joining the 'remote club' too",
        from: "john",
        to: "jane",
        createdAt: "2020-07-01 11:00:00",
        updatedAt: "2020-07-01 11:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3595",
        content: "Really? how come?",
        from: "jane",
        to: "john",
        createdAt: "2020-07-01 12:00:00",
        updatedAt: "2020-07-01 12:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3596",
        content: "got promoted to a consultancy role",
        from: "john",
        to: "jane",
        createdAt: "2020-07-01 13:00:00",
        updatedAt: "2020-07-01 13:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3597",
        content: "That's amazing!! well done!",
        from: "jane",
        to: "john",
        createdAt: "2020-07-01 14:00:00",
        updatedAt: "2020-07-01 14:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3598",
        content: "Thanks ;)",
        from: "john",
        to: "jane",
        createdAt: "2020-07-01 15:00:00",
        updatedAt: "2020-07-01 15:00:00",
      },
      {
        uuid: "7648485a-6657-48d7-87d6-6a98931d3599",
        content: "Hey John, are you done with that task?",
        from: "boss",
        to: "john",
        createdAt: "2020-07-01 11:00:00",
        updatedAt: "2020-07-01 11:00:00",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("messages", null, {});
  },
};
