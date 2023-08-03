const express =require('express');
const router = express.Router();
const cartStored = require('../controllers/cart-stored-controller');

router.route('/insert-to-cart')
    .post(cartStored.insertToCart);

router.route('/get-cart-data')
    .get(cartStored.getCartData);

module.exports = router;