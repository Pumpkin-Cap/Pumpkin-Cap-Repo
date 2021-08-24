const { models: { User, Level } } = require('../db')

const requireToken = async (req, res, next) =>{
  try{
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    req.user = user;

    next();
  } catch(e){
    next(e);
  }
}

const requireAdmin = (req, res, next) =>{
  if (!req.user.isAdmin){ return res.status(403).send('You\'re not even a has been. You\'re a never was.'); }
  else{ next(); }
}

const userIsUser = (req, res, next) =>{
  if (parseInt(req.user.id) !== parseInt(req.params.id) && !req.user.isAdmin){ return res.status(403).send('Duckposter!');}
  else{ next(); }
}

const userHasLevel = async (req, res, next) =>{

  if (req.query.password) {
    const level = await Level.findAll({where: {password: req.query.password}})
    if (level) {
      await req.user.addLevel(level)
    }
  }
  const userLevels = await req.user.getLevels()

  if ((userLevels.length > 0) && ((userLevels[userLevels.length - 1].id) < (parseInt(req.params.id) - 1) && !req.user.isAdmin)) {
    return res.status(403).send('You cannot handle these ducks.')
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  requireAdmin,
  userIsUser,
  userHasLevel
}
