const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['pending', 'submitted', 'fulfilled']]
    }
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Order;
