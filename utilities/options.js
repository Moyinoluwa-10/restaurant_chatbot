const menuOptions = [
  { option: 1, value: "Place an order" },
  { option: 99, value: "Checkout order" },
  { option: 98, value: "Check order history" },
  { option: 97, value: "Check current order" },
  { option: 0, value: "Cancel order" },
];

const foodOptions = [
  { option: 1, food: "Amala & Ewedu", price: 700 },
  { option: 2, food: "Amala & Okro", price: 2500 },
  { option: 3, food: "Amala & Efor", price: 800 },
  { option: 4, food: "Iyan & Ewedu", price: 1400 },
  { option: 4, food: "Iyan & Efor", price: 1400 },
  { option: 4, food: "Iyan & Okra", price: 1400 },
  { option: 4, food: "Iyan & Gbegiri", price: 1400 },
  { option: 5, food: "Eba & Ewedu", price: 1000 },
];

const menus =
  "Please select a number from the list below: <br /> <br />" +
  menuOptions
    .map((option) => {
      return `${option.option}. ${option.value}`;
    })
    .join(`<br />`);

module.exports = {
  menus,
  foodOptions,
};

