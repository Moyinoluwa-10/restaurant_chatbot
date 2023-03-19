const sessionModel = require("../models/session.model");
const chatModel = require("../models/chat.model");
const { menu, foodOptions } = require("../utilities/options");
const {
  configureMesage,
  configureReplies,
} = require("../utilities/configureOptions");
configureMesage;

// create a new session
const createSession = async (sessionID) => {
  // check if session id already exists
  const session = await sessionModel.findOne({ sessionID });

  // create a new session id
  if (!session) {
    await sessionModel.create({ sessionID });
  }
};

// load old messages of a user
const loadMessage = async (io, sessionID) => {
  const messages = await chatModel.find({ sessionID });
  // console.log(messages);

  if (!messages) return;

  messages.forEach((message) => {
    io.to(message.sessionID).emit("user-message", message.userMessage);
    io.to(message.sessionID).emit("bot-message", message.botMessage);
  });
};

// shows the options menu
const optionsMenu = (io, sessionID) => {
  let botMessage = configureMesage(menu);
  io.to(sessionID).emit("bot-message", botMessage);
  return botMessage;
};

// shows the food menu
const foodMenu = async (io, sessionID) => {
  let botMessage = configureMesage(
    configureReplies("Select One Item To Add to Your Cart", foodOptions)
  );
  io.to(sessionID).emit("bot-message", botMessage);
  return botMessage;
};

const checkOutOrder = async (io, sessionID) => {
  const sessionOrder = await sessionModel.findOne({ sessionID });

  let botMessage = "";
  if (sessionOrder.currentOrder.length < 1) {
    botMessage = configureMesage("You have not ordered anything yet");
    io.to(sessionID).emit("bot-message", botMessage);
  } else {
    sessionOrder.placedOrder = [
      ...sessionOrder.currentOrder,
      ...sessionOrder.placedOrder,
    ];
    sessionOrder.currentOrder = [];
    await sessionOrder.save();

    botMessage = configureMesage("Your Order has been placed");

    io.to(sessionID).emit("bot-message", botMessage);
  }
  io.to(sessionID).emit("bot-message", configureMesage(menu));

  return botMessage;
};

const orderHistory = async (io, sessionID) => {
  const sessionOrder = await sessionModel.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.placedOrder.length < 1) {
    botMessage = configureMesage("There is no order history yet");
    io.to(sessionID).emit("bot-message", botMessage);
  } else {
    botMessage = configureMesage(
      configureReplies("Here is the order history:", sessionOrder.placedOrder)
    );
    io.to(sessionID).emit("bot-message", botMessage);
  }
  io.to(sessionID).emit("bot-message", configureMesage(menu));

  return botMessage;
};

const currentOrder = async (io, sessionID) => {
  const sessionOrder = await sessionModel.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.currentOrder.length < 1) {
    botMessage = configureMesage(
      "You don't have any items in your current order yet."
    );
    io.to(sessionID).emit("bot-message", botMessage);
  } else {
    botMessage = configureMesage(
      BOTNAME,
      configureReplies("Your Current Order", sessionOrder.currentOrder)
    );
    io.to(sessionID).emit("bot-message", botMessage);
  }

  io.to(sessionID).emit("bot-message", configureMesage(menu));

  return botMessage;
};

const cancelOrder = async (io, sessionID) => {
  const sessionOrder = await sessionModel.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.currentOrder.length < 1) {
    botMessage = configureMesage("There is nothing to cancel.");

    io.to(sessionID).emit("bot-message", botMessage);
  } else {
    botMessage = configureMesage("Your order has been cancelled.");

    sessionOrder.currentOrder = [];
    await sessionOrder.save();

    io.to(sessionID).emit("bot-message", botMessage);
  }
  //TODO: save the resposne to the database
  io.to(sessionID).emit("bot-message", configureMesage(menu));

  return botMessage;
};

const saveOrder = async (io, sessionID, number) => {
  const sessionOrder = await sessionModel.findOne({ sessionID });

  let botMessage = "";

  sessionOrder.currentOrder.push(foodOptions[number - 1]);

  await sessionOrder.save();

  botMessage = configureMesage(
    configureReplies("Order Added", sessionOrder.currentOrder)
  );
  io.to(sessionID).emit("bot-message", botMessage);

  io.to(sessionID).emit("bot-message", configureMesage(menu));

  return botMessage;
};

module.exports = {
  createSession,
  loadMessage,
  optionsMenu,
  foodMenu,
  checkOutOrder,
  orderHistory,
  currentOrder,
  cancelOrder,
  saveOrder,
};

