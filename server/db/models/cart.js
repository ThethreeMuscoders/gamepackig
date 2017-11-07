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


// This method will be used to merge the session cart and the official cart.
Cart.prototype.addQuantity = (quantity) => {
  const newQuantity = this.getDataValue('quantity') + quantity;
  return this.setDataValue('quantity', newQuantity);
}
module.exports = Cart;
