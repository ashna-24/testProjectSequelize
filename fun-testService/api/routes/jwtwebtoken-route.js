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

router.route('/update-password/:id')
    .put(jwtwebtoken.updatePassword);

router.route('/update-data/:id')
    .put(jwtwebtoken.updateUserdata);

// router.route('/delete-all-users')
//     .delete(jwtwebtoken.deleteAllUsers);

module.exports = router;
