const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'testImg',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Product.prototype.addQuantity = function (num) {
  let newQuantity = this.getDataValue('quantity') + num;
  return this.setDataValue('quantity', newQuantity);
};

Product.prototype.removeQuantity = function (num) {
  let newQuantity = this.getDataValue('quantity') - num;
  return this.setDataValue('quantity', newQuantity);
};

module.exports = Product;
