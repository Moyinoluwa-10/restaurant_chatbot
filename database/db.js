const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config/config");
// const logger = require("../logging/logger");

function connectToMongoDB() {
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("An error occurred while connecting to MongoDB");
    console.error(err);
  });
}

module.exports = { connectToMongoDB };
