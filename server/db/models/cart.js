const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

const newCart = Cart.build({
  id: "supersecretsessionid",
  quantity: 30,
  price: 23.00,
  itemId: 2,
});
console.log(newCart)
module.exports = Cart;
