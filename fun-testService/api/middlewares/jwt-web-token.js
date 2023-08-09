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



// function jwtMiddleware(req, res, next) {
//   const authheader=req.headers['authorization'];
//   if (typeof authheader !== 'undefined') {
//       var bearer = authheader.split(' ')[1];
//       req.tokens = bearer;
//       next();
//   } 
//   else {
//       res.sendStatus(403);
//   }
// }

// const jwt = require('jwt-simple');
// const jwtSecretKey = 'your-secret-key';

// function generateToken(payload) {
//   return jwt.encode(payload, jwtSecretKey);
// }

// module.exports = {generateToken  , tokendata};
