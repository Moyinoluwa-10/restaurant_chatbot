const time =
  new Date().toLocaleTimeString().substring(0, 4) +
  "" +
  new Date().toLocaleTimeString().substring(7);

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
    time,
  };
}

module.exports = { configureReplies, configureMesage };

