const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 9000
    }
  }
});

module.exports = LineItem;
