const express = require("express");
const router = express.Router();
const searchKeyData = require('../controllers/searchKey-productId-controller');

router.route('/searchKey-productId')
    .post(searchKeyData.searchKeyProductId);

module.exports = router;