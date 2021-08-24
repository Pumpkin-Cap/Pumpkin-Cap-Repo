const router = require('express').Router()
const { models: { Level, Test, User }} = require('../db')
const { requireToken, userHasLevel } = require('./gatekeepingMiddleware');
module.exports = router




router.get('/list', requireToken, async (req, res, next) => {
  try {
    const levels = await Level.findAll({include: User, order: [['id','ASC']]})
    res.send(levels)
  } catch (err) {
    next(err)
  }
})


router.get('/:id', requireToken, userHasLevel, async (req, res, next) => {
  try {
    const level = await Level.findByPk(req.params.id,{include: Test})
    res.json(level)
  } catch (err) {
    next(err)
  }
})
