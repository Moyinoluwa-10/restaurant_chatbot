const moment = require("moment");

const configureReplies = (msg, list) => {
  let arrayMsg = "";

  arrayMsg = list
    .map((item, index) => {
      return `${index + 1}. ${item.food} - #${item.price} `;
    })
    .join(`<br>`);

  arrayMsg = `${msg}: <br>` + arrayMsg;
  return arrayMsg;
};

function configureMesage(msg) {
  return {
    msg,
    time: moment().format("h:mm a"),
  };
}

module.exports = { configureReplies, configureMesage };

