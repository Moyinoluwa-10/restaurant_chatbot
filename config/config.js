// access the values in the .env file

require("dotenv").config();

const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_MAXAGE = process.env.SESSION_MAXAGE;
const BOTNAME = process.env.BOTNAME;
const MONGODB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL;

const config = {
  botName: process.env.botName,
  PORT: process.env.PORT,
  mongoURI: process.env.mongoURI,
  sessionSecret: process.env.sessionSecret,
  local_db: process.env.local_db,
  db_name: process.env.db_name,
  sessionMaxAge: process.env.sessionMaxAge,
};

module.exports = {
  PORT,
  MONGODB_URL,
  SESSION_SECRET,
  SESSION_MAXAGE,
  BOTNAME,
};
