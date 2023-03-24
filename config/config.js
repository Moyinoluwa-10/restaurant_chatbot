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
const MONGODB_SESSION_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_SESSION_URL
    : process.env.MONGODB_SESSION_URL;

module.exports = {
  PORT,
  MONGODB_URL,
  SESSION_SECRET,
  SESSION_MAXAGE,
  BOTNAME,
  MONGODB_SESSION_URL,
};
