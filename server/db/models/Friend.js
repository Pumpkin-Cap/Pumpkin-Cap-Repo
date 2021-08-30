const Sequelize = require('sequelize')
const db = require('../db')

const Friend = db.define('friend')

module.exports = Friend
