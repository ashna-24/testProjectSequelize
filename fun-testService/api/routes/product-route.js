const express = require("express");
const router = express.Router();
const productData = require('../controllers/product-controller');
// const { verifyjwtwebToken } = require('../middlewares/jwt-web-token')

router.route('/product-data')
    .post(productData.createProductDetails);

router.route('/product-bulk-create')
    .post(productData.createBulkProduct);

router.route('/all-products')
    .get(/* verifyjwtwebToken, */ productData.getAllProducts);

router.route('/delete-product/:id')
    .delete(/* verifyjwtwebToken, */ productData.deleteProduct);

router.route('/count-all-products')
    .get(productData.countAllProducts);

router.route('/edit-price/:id')
    .put(/* verifyjwtwebToken, */ productData.editProductPrice);

router.route('/edit-quantity/:id')
    .put(productData.editProductQuantity);

module.exports = router;