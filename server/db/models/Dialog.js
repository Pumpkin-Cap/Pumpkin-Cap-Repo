const Sequelize = require('sequelize')
const db = require('../db')

const Dialog = db.define('dialog', {
    content: {
        type: Sequelize.TEXT
    }
})

module.exports = Dialog
