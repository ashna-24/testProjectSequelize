const express = require("express");
const router = express.Router();
const jwtwebtoken = require('../controllers/jwtwebtoken-controller');

router.route('/create-user-login')
    .post(jwtwebtoken.createUserToken);

router.route('/create-login-data')
    .post(jwtwebtoken.createLoginData);

module.exports = router;
