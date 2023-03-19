# Jitters Restaurant Chatbot 🤖

## Description
This is a restaurant chatbot application for Jitters built using NodeJS, MongoDB, Express-Session, Socket.io, and Express. It assists customers in placing orders for their preferred meals.

---
## Live Site

Below is the live site to use the restaurant chatbot
-   [Restaurant Bot](https://restaurant-chatbot-v5u5.onrender.com/)

---

## Tools Used

 * **node.js** and **express** as the JavaScript runtime environment and server framework.
 * **mongodb** as a database of choice.
 * **mongoose** as an ODM library of choice.
 * **socket.io** as a WebSocket library of choice.
 * **express-session**- simple session middleware for Express.

---


## Features

-   Place an Order: Users can place an order food by entering the corresponding number of the item they want from the menu.
-   Cancel order: Users can cancel their order by entering 0 and it cancels their current order cart
-   Check order history: Users can check their current or old order history by entering the corresponding number.
- Save session and chat history: The chatbot saves the user's session and chat history, so they can resume their order or check their history at any time.



## How to use
This chatbot application is pretty intuitive to use, but here are some instructions on how to use it:
- To place an order, enter `1`.
- To select a food, enter the index of the food item.
- To checkout an order, enter `99`.
- To check your order history, enter `98`.
- To check your current order, enter `97`.
- To cancel your current order, enter `0`.

>**Note**- If you enter any command other than the ones above, the bot will regard it as an invalid response.

### Getting Started

1. Clone this repository using
    - `git clone https://github.com/Moyinoluwa-10/restaurant_chatbot.git`
2. Install all  dependencies using
    - `npm install`
3. Create a .env file in the root directory using the sample.env file as a guide 
4. Start the application:
    - `npm run dev`
5. Open the application in your browser:
    - `http://localhost:4000`

---

## Author
[Moyinoluwa Adelowo](https://github.com/moyinoluwa-10) 
