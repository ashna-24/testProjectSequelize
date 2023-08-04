const httpStatus = require('http-status');
const { verifyJwtToken } = require('../utils/jwt');

const jwtMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader){
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ status: false, message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ status: false, message: 'Invalid token format.' });
    }

    const decodedToken = verifyJwtToken(token);
    req.user = decodedToken;
    next();
  } 
  catch (err) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ status: false, message: 'Invalid token.' });
  }
};

module.exports = {jwtMiddleware};
