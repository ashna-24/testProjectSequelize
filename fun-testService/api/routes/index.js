const express = require('express');
const router = express.Router();
const productRoute = require('./product-route');
const userRoute = require('./user-route');
const cartRoute = require('./cart-route');

router.get('/status', async (req, res) => {
    res.send('OK');
});

router.use(productRoute);

router.use(userRoute);

router.use(cartRoute);

module.exports = router;