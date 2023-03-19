const menuOptions = [
  { option: 1, value: "Place an order" },
  { option: 99, value: "Checkout order" },
  { option: 98, value: "Check order history" },
  { option: 97, value: "Check current order" },
  { option: 0, value: "Cancel order" },
];

const foodOptions = [
  { option: 1, food: "Yam & Egg", price: 2500 },
  { option: 2, food: "Freshly baked croissant", price: 1200 },
  { option: 3, food: "Burger", price: 1500 },
  { option: 4, food: "Milkshake", price: 500 },
  { option: 5, food: "Bagel", price: 800 },
  { option: 6, food: "Salads", price: 800 },
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

