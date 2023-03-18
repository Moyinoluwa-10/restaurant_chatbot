const sess = require("express-session");
const { SESSION_SECRET, SESSION_MAXAGE } = require("../config/config");
const maxAge = parseInt(SESSION_MAXAGE);

// session config
const session = sess({
  name: "order",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge },
});

module.exports = { session };
