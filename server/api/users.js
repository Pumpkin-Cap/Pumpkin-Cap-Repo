const router = require('express').Router()
const { models: { User, Level }} = require('../db')
const { requireToken, requireAdmin, userIsUser } = require('./gatekeepingMiddleware');
module.exports = router

router.get('/', requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: Level})
    res.json(user)
  } catch (err) {
    next(err)
  }
})



router.put('/update/:id', requireToken, userIsUser, async (req, res, next) => {
  try {
    await user.update({username, password})
    console.log(user)
    res.json(user)
  } catch (err) {
    next(err)
  }
})





