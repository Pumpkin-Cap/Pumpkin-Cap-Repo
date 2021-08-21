const Sequelize = require('sequelize')
const db = require('../db')


const Level = db.define('level', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Level

