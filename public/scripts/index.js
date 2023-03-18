// declaring variables
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".form-input");
const loadingEl = document.querySelector(".loading");
const chatBody = document.querySelector(".chat-body");

// send message on form submit
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chat message", inputEl.value);
  socket.emit("private message", inputEl.value);
  inputEl.value = "";
});
inputEl.focus();

// get time function
function getTime() {
  let today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours + ":" + minutes;
  return time;
}

// load first message on page load
function firstBotMessage(msg) {
  let time = getTime();
  document.querySelector(".chat-timestamp").textContent = time;

  // let firstMessage = "Hey there, Welcome to Iya Sikira Joint";
  document.getElementById("bot-starter-message").innerHTML =
    "<span>" + msg + "</span>";

  formEl.scrollIntoView(false);
}

// firstBotMessage();

// retrieves the response
function createBotMessage(msg) {
  // let botResponse = getBotResponse(userText);
  const messageEl = document.createElement("p");
  messageEl.classList.add("bot-message");
  const spanEl = document.createElement("span");
  spanEl.innerHTML = msg;
  messageEl.append(spanEl);
  document.getElementById("chat-block").append(messageEl);
  setScrollPosition();
}

// gets the msg from the inputEl box and processes it
function createUserMessage(msg) {
  const messageEl = document.createElement("p");
  messageEl.classList.add("user-message");
  const spanEl = document.createElement("span");
  spanEl.textContent = msg;
  messageEl.append(spanEl);

  inputEl.value = "";
  document.getElementById("chat-block").append(messageEl);
  setScrollPosition();
}

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

const socket = io();
socket.on("first-message", (data) => {
  firstBotMessage(data.msg);
});

socket.on("second-message", (data) => {
  console.log(data);
  createBotMessage(data);
});

socket.on("chat message", (data) => {
  // console.log(data);
  if (data.sender === "bot") {
    createBotMessage(data.message);
  } else {
    createUserMessage(data.message);
  }
});

socket.on("bot message", (data) => {
  // loadingEl.classList.remove("hidden");
  console.log(data);
  if (Array.isArray(data.msg)) {
    let msg = data.msg
      .map((item) => `${item.number}: To ${item.text}`)
      .join(`<br>`);
    msg = "Please select a number from the list below: <br>" + msg;
    data.msg = msg;
  } else {
    data.msg = data.msg;
  }
  createBotMessage(data.msg);
  // loadingEl.classList.add("hidden");
});

socket.on("user message", (data) => {
  console.log(data);
  // console.log(data);
  createUserMessage(data.msg);
});

// createBotMessage("hello world<br/>Hello world");
// createBotMessage2(`hello world\nHello world`);
