const db = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Wig = db.define('wig', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://image.flaticon.com/icons/png/512/42/42006.png',
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 9000
    },
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  length: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['short', 'medium', 'long']]
    }
  },
  material: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['human', 'synthetic']]
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [
        ['black', 'brown', 'blonde', 'rainbow', 'red', 'altervative', 'gray']
      ]
    }
  }
});

//The code example below demonstrates a class method. Class methods are methods that are available on the model itself (aka the class). We often write these to get instances, or do something to more than one instance.

// Class method that accepts an array of wig ids and returns an array of those wigs from the database.
Wig.findByIds = async function(wigIds) {
  const wigstoupdate = await Wig.findAll({
    where: {
      id: {
        [Op.in]: wigIds
      }
    }
  });
  return wigstoupdate;
};

// Instance method that returns true if there's sufficient stock/quantity to fulfill the order and false if there isn't.
Wig.prototype.checkQuantity = function(orderQuantity) {
  if (this.quantity >= orderQuantity) {
    return true;
  }
  return false;
};

// Instance method to calculate the quantity that will remain after an order is fulfilled.
Wig.prototype.getReducedQuantity = function(orderQuantity) {
  return this.quantity - orderQuantity;
};

module.exports = Wig;
