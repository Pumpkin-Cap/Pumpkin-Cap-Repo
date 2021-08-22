const router = require('express').Router()
const { models: { User, Level }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
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


router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: Level})
    res.json(user)
  } catch (err) {
    next(err)
  }
})



router.put('/update/:id', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.headers.authorization)
    const {username, password} = req.body
    console.log(req.params)
    if (user.id === parseInt(req.params.id)) {
      await user.update({username, password})
      console.log(user)
      res.json(user)
    } else {
      res.sendStatus(403)
    }

  } catch (err) {
    next(err)
  }
})





