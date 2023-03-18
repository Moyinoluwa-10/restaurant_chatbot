const responseObj = {
  hello: "Hey ! How are you doing ?",
  hey: "Hey! What's Up",
  today: new Date().toDateString(),
  time: new Date().toLocaleTimeString(),
};

const fetchResponse = (userInput) => {
  //   return responseObj[userInput];
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(responseObj[userInput]);
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};

const chatBotService = {
  getBotResponse(userInput) {
    return fetchResponse(userInput);
  },
};

export default chatBotService;
