const router = require('express').Router()
const { models: { Level }} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const level = await Level.findByPk(req.params.id,{include: {all: true, nested: true}
    })
    res.json(level)
  } catch (err) {
    next(err)
  }
})