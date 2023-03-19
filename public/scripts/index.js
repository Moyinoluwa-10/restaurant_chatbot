// declaring variables
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".form-input");
const loadingEl = document.querySelector(".loading");
const chatBody = document.querySelector(".chat-body");
const socket = io();

// send message on form submit
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chat-message", inputEl.value);
  inputEl.value = "";
  inputEl.focus();
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

// load the first bot message on page load
function firstBotMessage(data) {
  let time = getTime();
  document.querySelector(".chat-timestamp").textContent = time;

  // let firstMessage = "Hey there, Welcome to Iya Sikira Joint";
  document.getElementById("bot-starter-message").innerHTML =
    "<span>" + data.msg + "</span><small>" + data.time + "</small>";

  formEl.scrollIntoView(false);
}

// creates a bot message
function createBotMessage(data) {
  const messageEl = document.createElement("p");
  messageEl.classList.add("bot-message");
  const spanEl = document.createElement("span");
  spanEl.innerHTML = data.msg;
  const smallEl = document.createElement("small");
  smallEl.textContent = data.time;
  messageEl.append(spanEl);
  messageEl.append(smallEl);
  document.getElementById("chat-block").append(messageEl);
  setScrollPosition();
}

// creates a user message
function createUserMessage(data) {
  const messageEl = document.createElement("p");
  messageEl.classList.add("user-message");
  const spanEl = document.createElement("span");
  spanEl.textContent = data.msg;
  const smallEl = document.createElement("small");
  smallEl.textContent = data.time;
  messageEl.append(spanEl);
  messageEl.append(smallEl);
  document.getElementById("chat-block").append(messageEl);
  setScrollPosition();
}

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

socket.on("first-message", (data) => {
  firstBotMessage(data);
});

socket.on("bot-message", (data) => {
  // console.log(data);
  createBotMessage(data);
});

socket.on("user-message", (data) => {
  // console.log(data);
  createUserMessage(data);
});
