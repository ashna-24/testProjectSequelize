// const tokendata = [];

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

const jwt = require('jwt-simple');
const jwtSecretKey = 'your-secret-key';

function generateToken(payload) {
  return jwt.encode(payload, jwtSecretKey);
}

module.exports = {generateToken  , tokendata};
