const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['pending', 'fulfilled']]
    }
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = Order;
