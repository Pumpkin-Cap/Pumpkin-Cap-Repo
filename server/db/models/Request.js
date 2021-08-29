const Sequelize = require('sequelize')
const db = require('../db')

const Request = db.define('request', {
  pending: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Request;
