const express = require('express');
const router = express.Router();
const productRoute = require('./product-route');
const userRoute = require('./user-route');
const cartRoute = require('./cart-route');
const cartStoredRoute = require('./cart-stored-route');
const jwtTokenRoute = require('./jwtwebtoken-route');
const jwtSimpleRoute = require('./jwt-simple-route');
const searchProductId = require('./searchKey-productId-route');
const searchQuantity = require('./searchKey-quantity-route');

router.get('/status', async (req, res) => {
    res.send('OK');
});

router.use(productRoute);

router.use(userRoute);

router.use(cartRoute);

router.use(cartStoredRoute);

router.use(jwtTokenRoute);

router.use(jwtSimpleRoute);

router.use(searchProductId);

router.use(searchQuantity);

module.exports = router;