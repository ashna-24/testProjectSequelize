const jwt = require('jsonwebtoken');
const config = require('config');

const verifyJwtToken = (token) => {
  const { jwtSecret } = config;

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { verifyJwtToken };

