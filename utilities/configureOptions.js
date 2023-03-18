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
    time: new Date().toLocaleTimeString(),
  };
}

module.exports = { configureReplies, configureMesage };

