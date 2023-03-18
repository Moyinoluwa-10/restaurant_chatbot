const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { session } = require("./middlewares/session.middleware");
const {
  saveSessionID,
  createSession,
  loadMessage,
  welcomeMessage,
  mainMenus,
  menu,
  checkOutOrder,
  orderHistory,
  currentOrder,
  cancelOrder,
  saveOrder,
} = require("./controllers/chat.controller");
const { connectToMongoDB } = require("./database/db");
const messageModel = require("./models/chat.model");
// const configureMesage = require("./utils/message");
const { BOTNAME } = require("./config/config");
const { menus, food } = require("./utilities/options");
const { configureMesage } = require("./utilities/configureOptions");

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);
// const io = socket(server);
const Server = socket.Server;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

app.use(session);
io.engine.use(session);

const levels = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  // get the session id from the socket
  const session = socket.request.session;
  const sessionId = session.id;
  createSession(sessionId);

  console.log(sessionId);
  // console.log(socket.request.session);

  //the socket.id changes every time the user refreshes the page, so we use the session id to identify the user and create a room for them
  socket.join(sessionId);

  loadMessage(io, sessionId);

  //welcome the user
  io.to(sessionId).emit("first-message", {
    sender: "bot",
    msg: "Welcome to the chat app, say hello to the bot",
  });

  levels[sessionId] = 0;
  socket.on("chat-message", async (msg) => {
    let userMessage = configureMesage(msg);
    const number = parseInt(msg);
    io.to(sessionId).emit("user-message", userMessage);
    let botMessage = "";

    switch (levels[sessionId]) {
      case 0:
        console.log("hello");
        botMessage = await mainMenus(io, sessionId);
        levels[sessionId] = 1;
        break;
      case 1:
        if (number === 1) {
          botMessage = await menu(io, sessionId);
          levels[sessionId] = 2;
          return;
        } else if (number === 99) {
          botMessage = await checkOutOrder(io, sessionId);
          levels[sessionId] = 1;
        } else if (number === 98) {
          botMessage = await orderHistory(io, sessionId);
          levels[sessionId] = 1;
        } else if (number === 97) {
          botMessage = await currentOrder(io, sessionId);
        } else if (number === 0) {
          botMessage = await cancelOrder(io, sessionId);
        } else {
          botMessage = await configureMesage(
            "Invalid Input. Enter 1 or 99 or 98 or 97 or 0"
          );
          io.to(sessionId).emit("bot-message", botMessage);
        }
        levels[sessionId] = 1;
        break;
      case 2:
        if (
          number !== 1 &&
          number !== 2 &&
          number !== 3 &&
          number !== 4 &&
          number !== 5
        ) {
          botMessage = await configureMesage(
            "Invalid Input. Enter 1 or 2 or 3 or 4 or 5"
          );
          io.to(sessionId).emit("bot-message", botMessage);
          levels[sessionId] = 2;
          return;
        } else {
          botMessage = await saveOrder(io, sessionId, number);
          levels[sessionId] = 1;
        }
        break;
    }
    const saveMessage = await new messageModel({
      sessionID: sessionId,
      userMessage,
      botMessage,
    });
    await saveMessage.save();
  });
});

connectToMongoDB();

//starting the server
server.listen(4000, () => {
  console.log("listening on *:4000");
});
