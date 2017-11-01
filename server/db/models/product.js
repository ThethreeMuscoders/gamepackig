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
<<<<<<< HEAD
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
=======
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
>>>>>>> master
})


module.exports = Product;
