const express = require("express");
const router = express.Router();
const jwtwebtoken = require('../controllers/jwtwebtoken-controller');
const {verifyjwtwebToken} = require('../middlewares/jwt-web-token');

router.route('/create-user-login')
    .post(jwtwebtoken.createUserToken);

router.route('/create-login-data')
    .post(jwtwebtoken.createLoginData);

router.route('/get-login')
    .get(verifyjwtwebToken ,jwtwebtoken.getLogin);

router.route('/jwt-web-logout')
    .post(jwtwebtoken.jwtWebLogout);

module.exports = router;
