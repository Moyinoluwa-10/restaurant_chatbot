// var socket = io();

// var form = document.getElementById("form");
// var input = document.getElementById("input");

// input.addEventListener("focus", function (e) {
//   console.log("item is focused");
//   socket.emit("typing", "user is typing");
// });

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   var item = document.createElement("li");
//   item.textContent = input.value;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
//   if (input.value) {
//     console.log("chat_message: " + input.value);
//     socket.emit("chat message", input.value);
//     input.value = "";
//   }
// });

// socket.on("connection", function (msg) {
//   console.log("connected");
// });

// socket.on("chat message", function (msg) {
//   console.log("server_says: " + msg);
//   var item = document.createElement("li");
//   item.textContent = msg;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });

// socket.on("user_connected", function (msg) {
//   //   alert("A new user connected");
// });

//connect to the socket
// const socket = io();

// //get the elements from the DOM
// const messages = document.getElementById("messages");
// const chatForm = document.getElementById("chat-form");

// //listen for the chat message event from the server
// socket.on("chat message", (message) => {
//   //output the message to the DOM
//   outputMessage(message);
// });

// //attach an event listener to the form
// chatForm.addEventListener("submit", (e) => {
//   //prevent the default behaviour
//   e.preventDefault();

//   //get the message from the input
//   const message = e.target.elements["message-input"].value;

//   //sends the message to the server
//   socket.emit("chat message", message);

//   //clear the input field
//   e.target.elements["message-input"].value = "";
//   e.target.elements["message-input"].focus();
// });

// //Output the message to the DOM
// const outputMessage = (message) => {
//   //create a div element
//   const div = document.createElement("div");
//   div.classList.add("message");
//   //check if the message is from the bot or the user
//   if (message.sender === "bot") {
//     div.innerHTML = `bot message: ${message.message}`;
//   } else {
//     div.innerHTML = `user message: ${message.message}`;
//   }
//   //append the div to the messages div
//   messages.appendChild(div);
// };
