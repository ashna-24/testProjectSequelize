const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key";
const { isTokenBlacklisted } = require('../utils/blacklistUtils');

function verifyjwtwebToken(req,res,next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401).json({
      status:"Token doesn't exists"
    });
  }

  if (isTokenBlacklisted(token)) {
    return res.sendStatus(401); // Token is blacklisted
  }

  try {
    const authenticateUser = token.split(' ')[1];
    if(authenticateUser){
      const decodedToken = jwt.verify(authenticateUser, jwtKey);
      req.authUser = decodedToken;
      return next();
    }
    return res.sendStatus(401);
  } 
  catch(err) {
      return res.sendStatus(403);
  }
}

const tokendata = [];

module.exports = { verifyjwtwebToken ,tokendata};