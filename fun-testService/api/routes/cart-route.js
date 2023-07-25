const express = require("express");
const router = express.Router();
const cartData = require('../controllers/cart-controller');

router.route('/add-to-cart')
    .post(cartData.addtoCart);

router.route('/fetch-data')
    .get(cartData.fetchData);

router.route('/delete-data/:id')
    .delete(cartData.deleteData);

router.route('/update-quantity/:id')
    .put(cartData.updateQuantity);

module.exports=router;