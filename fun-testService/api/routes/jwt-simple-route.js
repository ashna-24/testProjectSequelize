const express = require("express");
const router = express.Router();
const jwtsimpletoken = require('../controllers/jwt-simple-controller');

router.route('/create-sample-login')
    .post(jwtsimpletoken.createSampleLogin);

module.exports = router;