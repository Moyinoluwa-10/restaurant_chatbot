import chatBotService from "./chatbotservice.js";
const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");
const loadingEle = document.querySelector(".loading");
const chatHeader = document.querySelector(".chat-header");
const container = document.querySelector(".container");

chatHeader.addEventListener("click", () => {
  container.classList.toggle("collapse");
});

send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});

// const renderUserMessage = () => {
//   const userInput = txtInput.value;
//   renderMessageEle(userInput, "user");
//   txtInput.value = "";
//   toggleLoading(false);
//   setTimeout(() => {
//     renderChatbotResponse(userInput);
//     setScrollPosition();
//     toggleLoading(true);
//   }, 1000);
// };

const renderUserMessage = () => {
  const userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  toggleLoading(false);
  getChatbotResponse(userInput);
};

// const renderChatbotResponse = (userInput) => {
//   return chatBotService.getBotResponse(userInput) === undefined
//     ? "Please try something else"
//     : chatBotService.getBotResponse(userInput);
//   // renderMessageEle(res);
// };

// const renderChatbotResponse = (userInput) => {
//   const res = getChatbotResponse(userInput);
//   // renderMessageEle(res);
// };

// const renderMessageEle = (txt, type) => {
//   let className = "user-message";
//   if (type !== "user") {
//     className = "chatbot-message";
//   }
//   const messageEle = document.createElement("div");
//   const txtNode = document.createTextNode(txt);
//   messageEle.classList.add(className);
//   messageEle.append(txtNode);
//   chatBody.append(messageEle);
// };

const renderMessageEle = (txt, type) => {
  let className = "user-message";

  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.append(txtNode);
  if (type !== "user") {
    className = "chatbot-message";
    messageEle.classList.add(className);
    const botResponseContainer = document.createElement("div");
    botResponseContainer.classList.add("bot-response-container");
    const botImg = document.createElement("img");
    botImg.setAttribute("src", "./assets/images/chatbot.png");
    botResponseContainer.append(botImg);
    botResponseContainer.append(messageEle);

    chatBody.append(botResponseContainer);
  } else {
    messageEle.classList.add(className);
    chatBody.append(messageEle);
  }
};

const getChatbotResponse = (userInput) => {
  chatBotService
    .getBotResponse(userInput)
    .then((response) => {
      console.log(response);
      renderMessageEle(response);
      setScrollPosition();
      toggleLoading(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

// const getChatbotResponse = (userInput) => {
//   return responseObj[userInput] == undefined
//     ? "Please try something else"
//     : responseObj[userInput];
// };

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

const toggleLoading = (show) => {
  loadingEle.classList.toggle("hide", show);
};
