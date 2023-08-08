const jwt = require('jwt-simple');
const jwtKey = "my_secret_key";
const { isTokenBlacklisted } = require('../utils/blacklistUtils');

function verifyjwtsimple(req,res,next) {
    const token = req.headers.authorization;

    if(!token) {
        return res.sendStatus(401).json({
            message: 'Unauthorized'
        });
    }

    if (isTokenBlacklisted(token)) {
        return res.sendStatus(401);
    }

    try {
        const simpleAuthUser = token.split(' ')[1];
        if (simpleAuthUser) {
        const decodedToken = jwt.decode(simpleAuthUser, jwtKey);
        req.authSimpleUser = decodedToken;
        return next();
        }
        return res.sendStatus(401);
    } 
    catch(err) {
        return res.sendStatus(403);
    }
}

module.exports = { verifyjwtsimple };