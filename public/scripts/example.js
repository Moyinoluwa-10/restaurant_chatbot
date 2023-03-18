// // declaring variables
// const formEl = document.querySelector(".form");
// const inputEl = document.querySelector(".form-input");
// const loadingEl = document.querySelector(".loading");
// const chatBody = document.querySelector(".outer-container");

// // send message on form submit
// formEl.addEventListener("submit", (e) => {
//   e.preventDefault();
//   socket.emit("chat message", inputEl.value);
//   getResponse();
// });

// // get time function
// function getTime() {
//   let today = new Date();
//   hours = today.getHours();
//   minutes = today.getMinutes();

//   if (hours < 10) {
//     hours = "0" + hours;
//   }

//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }

//   let time = hours + ":" + minutes;
//   return time;
// }

// // load first message on page load
// function firstBotMessage(msg) {
//   let time = getTime();
//   document.querySelector(".chat-timestamp").textContent = time;

//   // let firstMessage = "Hey there, Welcome to Iya Sikira Joint";
//   document.getElementById("bot-starter-message").innerHTML =
//     "<span>" + msg + "</span>";

//   formEl.scrollIntoView(false);
// }

// // firstBotMessage();

// // retrieves the response
// function getHardResponse(userText) {
//   let botResponse = getBotResponse(userText);
//   const messageEl = document.createElement("p");
//   messageEl.classList.add("bot-message");
//   const spanEl = document.createElement("span");
//   spanEl.textContent = botResponse;
//   messageEl.append(spanEl);
//   document.getElementById("chatbox").append(messageEl);
//   setScrollPosition();
// }

// // gets the text from the inputEl box and processes it
// function getResponse(msg) {
//   let userText = inputEl.value;

//   if (userText == "") {
//     userText = "I love Code Palace!";
//   }

//   const p = document.createElement("p");
//   p.classList.add("user-message");
//   const span = document.createElement("span");
//   span.textContent = userText;
//   p.append(span);

//   inputEl.value = "";
//   document.getElementById("chatbox").append(p);
//   setScrollPosition();

//   setTimeout(() => {
//     getHardResponse(userText);
//   }, 1000);
// }

// const setScrollPosition = () => {
//   if (chatBody.scrollHeight > 0) {
//     chatBody.scrollTop = chatBody.scrollHeight;
//   }
// };

// const socket = io();
// socket.on("first-message", (data) => {
//   console.log(data);
//   firstBotMessage(data.msg);
// });

// socket.on("chat message", (data) => {});
