const Sequelize = require('sequelize')
const db = require('../db')


const Level = db.define('level', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  prompt: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING,
  },
  startingJS: {
    type: Sequelize.TEXT
  },
  password: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Level

