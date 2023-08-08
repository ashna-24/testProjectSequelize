const express = require("express");
const router = express.Router();
const jwtsimpletoken = require('../controllers/jwt-simple-controller');
const {verifyjwtsimple} = require('../middlewares/jwt-simple');

router.route('/get-simple-token')
    .get(verifyjwtsimple, jwtsimpletoken.getSimpleLogin);

router.route('/jwt-simple-logout')
    .post(jwtsimpletoken.jwtSampleLogout);

module.exports = router;