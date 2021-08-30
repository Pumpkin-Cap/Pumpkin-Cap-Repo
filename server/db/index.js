//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Level = require('./models/Level')
const Test = require('./models/Test')
const Request = require('./models/Request')

//associations could go here!

User.belongsToMany(Level, {through: 'completedLevel'})
Level.belongsToMany(User, {through: 'completedLevel'})
User.belongsToMany(User, {as: 'friends', through: Request})


Level.hasMany(Test)
Test.belongsTo(Level)



module.exports = {
  db,
  models: {
    User,
    Level,
    Test,
    Request,
  },
}
