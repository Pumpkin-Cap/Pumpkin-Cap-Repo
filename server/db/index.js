//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Level = require('./models/Level')
const Test = require('./models/Test')

//associations could go here!

User.belongsToMany(Level, {through: 'completedLevel'})
Level.belongsToMany(User, {through: 'completedLevel'})

Level.hasMany(Test)
Test.belongsTo(Level)



module.exports = {
  db,
  models: {
    User,
    Level,
    Test,
  },
}
