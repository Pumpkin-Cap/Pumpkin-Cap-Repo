//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Tutorial = require('./models/Tutorial')
const Level = require('./models/Level')
const Test = require('./models/Test')
const Request = require('./models/Request')
const Friend = require('./models/Friend')
const Dialog = require('./models/Dialog')

//associations could go here!

User.belongsToMany(Level, {through: 'completedLevel'})
Level.belongsToMany(User, {through: 'completedLevel'})
// User.belongsToMany(User, {as: 'friends', through: Request})
User.belongsToMany(User, {as: 'friends', through: Friend})

Level.hasMany(Test)
Test.belongsTo(Level)

Level.hasMany(Dialog)
Dialog.belongsTo(Level)

User.belongsToMany(Tutorial, {through: 'completedTutorial'})
Tutorial.belongsToMany(User, {through: 'completedTutorial'})

Tutorial.hasMany(Test)
Test.belongsTo(Tutorial)

Tutorial.hasMany(Dialog)
Dialog.belongsTo(Tutorial)


module.exports = {
  db,
  models: {
    User,
    Level,
    Tutorial,
    Test,
    Request,
    Friend,
    Dialog
  },
}
