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
const { BOTNAME, PORT } = require("./config/config");
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

const progress = {};

io.on("connection", (socket) => {
  // get the session id from the socket
  const session = socket.request.session;
  const sessionId = session.id;

  // create a new session
  createSession(sessionId);

  console.log("a user connected,", sessionId);

  // join the user to the room for that user only
  socket.join(sessionId);

  // load previous messages of a user
  loadMessage(io, sessionId);

  // welcome the user
  let firstMessage = "Welcome to the Jitters Restaurant, How can I help you?";
  io.to(sessionId).emit("first-message", configureMesage(firstMessage));

  // progress is used to track the user's progress in the chatbot
  progress[sessionId] = 0;

  // listen for user message
  socket.on("chat-message", async (msg) => {
    let userMessage = configureMesage(msg);
    io.to(sessionId).emit("user-message", userMessage);
    const number = parseInt(msg);
    let botMessage = "";

    switch (progress[sessionId]) {
      case 0:
        console.log("hello");
        botMessage = await mainMenus(io, sessionId);
        progress[sessionId] = 1;
        break;
      case 1:
        if (number === 1) {
          botMessage = await menu(io, sessionId);
          progress[sessionId] = 2;
          return;
        } else if (number === 99) {
          botMessage = await checkOutOrder(io, sessionId);
          progress[sessionId] = 1;
        } else if (number === 98) {
          botMessage = await orderHistory(io, sessionId);
          progress[sessionId] = 1;
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
        progress[sessionId] = 1;
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
          progress[sessionId] = 2;
          return;
        } else {
          botMessage = await saveOrder(io, sessionId, number);
          progress[sessionId] = 1;
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

// connect to the database
connectToMongoDB();

// start the server
server.listen(PORT, () => {
  console.log(`listening on *${PORT}`);
});
