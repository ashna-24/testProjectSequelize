const express = require("express");
const router = express.Router();
const productData = require('../controllers/product-controller');
const { jwtMiddleware } = require('../middlewares/tokens')

router.route('/product-data')
    .post(jwtMiddleware, productData.createProductDetails);

router.route('/product-bulk-create')
    .post(productData.createBulkProduct);

router.route('/all-products')
    .get(productData.getAllProducts);

router.route('/delete-product/:id')
    .delete(productData.deleteProduct);

router.route('/count-all-products')
    .get(productData.countAllProducts);

router.route('/edit-price/:id')
    .put(productData.editProductPrice);

router.route('/edit-quantity/:id')
    .put(productData.editProductQuantity);

module.exports = router;