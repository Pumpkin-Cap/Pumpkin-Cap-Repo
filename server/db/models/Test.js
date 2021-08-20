const Sequelize = require('sequelize')
const db = require('../db')


const Test = db.define('test', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  test: {
    type: Sequelize.TEXT,
  },
  testDiv: {
    type: Sequelize.STRING,
  }
})

module.exports = Test

