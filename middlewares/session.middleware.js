const sess = require("express-session");
const {
  SESSION_SECRET,
  SESSION_MAXAGE,
  MONGODB_SESSION_URL,
} = require("../config/config");
const maxAge = parseInt(SESSION_MAXAGE);

const MongoDBStore = require("connect-mongodb-session")(sess);

const store = new MongoDBStore({
  uri: MONGODB_SESSION_URL,
  collection: "mySessions",
  expires: maxAge,
});

// catch errors
store.on("error", function (error) {
  console.log(error);
});

// session config
const session = sess({
  name: "order",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge },
  store,
});

module.exports = { session };
