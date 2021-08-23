const router = require('express').Router()
const { models: { Level, Test, User }} = require('../db')
module.exports = router




router.get('/list', async (req, res, next) => {
  try {

    if (req.query.password && req.headers.authorization) {
      const user = await User.findByToken(req.headers.authorization)
      const level = await Level.findAll({where: {password: req.query.password}})
      if (level) {
        await user.addLevel(level)
      }
    }
    const levels = await Level.findAll({include: User, order: [['id','ASC']]})
    res.send(levels)
  } catch (err) {
    next(err)
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    const level = await Level.findByPk(req.params.id,{include: Test})
    res.json(level)
  } catch (err) {
    next(err)
  }
})
