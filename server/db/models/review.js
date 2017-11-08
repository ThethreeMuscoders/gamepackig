const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [10, 1000],
    },
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5,
    },
  },
});

module.exports = Review;
