const express = require('express');
const router = express.Router();
const searchQuantity = require('../controllers/searchKey-quantity-controller');

router.route('/search-quantity')
    .post(searchQuantity.searchKeyQuantity);

module.exports = router;