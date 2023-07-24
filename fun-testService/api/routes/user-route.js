const express = require('express');
const router = express.Router();
const userData = require('../controllers/user-controller');

router.route('/create-user')
    .post(userData.createUser);

module.exports = router