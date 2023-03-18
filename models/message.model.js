const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sessionID: {
      type: String,
      required: [true, "Enter a Session ID"],
      trim: true,
    },
    userMessage: {
      username: String,
      msg: String,
      time: String,
    },
    botMessage: {
      username: String,
      msg: String,
      time: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", MessageSchema);

