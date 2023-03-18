const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    sessionID: {
      type: String,
      required: [true, "SessionID is missing"],
      trim: true,
    },
    userMessage: {
      msg: String,
      time: String,
    },
    botMessage: {
      msg: String,
      time: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);

