const express =require('express');
const router = express.Router();
const cartStored = require('../controllers/cart-stored-controller');

router.route('/insert-to-cart')
    .post(cartStored.insertToCart);

router.route('/get-cart-data')
    .get(cartStored.getCartData);

router.route('/delete-cart-data-sp/:id')
    .delete(cartStored.deleteData);

router.route('/update-quantity-data-sp/:id')
    .put(cartStored.updateCartQuantity);

module.exports = router;