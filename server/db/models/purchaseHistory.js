const Sequelize = require('sequelize')
const db = require('../db')

const PurchaseHistory = db.define('purchaseHistory', {
  deliveryDate: {
    type: Sequelize.DATE,
  },
  expectedDate: {
    type: Sequelize.DATE,
  },

  status: {
    type: Sequelize.ENUM('CANCELLED', 'COMPLETED', 'CREATED', 'PROCESSING'),
    allowNull: false,
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
})


module.exports = PurchaseHistory;