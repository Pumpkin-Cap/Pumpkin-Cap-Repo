const { models: { User } } = require('../db')

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

const userHasLevel = (req, res, next) =>{
  if (parseInt(req.user.levels[req.user.levels.length - 1].id) < (parseInt(req.params.id) - 1) && !req.user.isAdmin){ return res.status(403).send('You cannot handle these ducks.');}
  else{ next(); }
}

module.exports = {
  requireToken,
  requireAdmin,
  userIsUser,
  userHasLevel
}
