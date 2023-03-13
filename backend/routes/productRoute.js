const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProducts, getSingleProduct, createProductReview, getProductReviews, deleteReview, getTrendingProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

const router=express.Router();

router.route('/products').get(getAllProducts);
router.route('/trending-products').get(getTrendingProducts);

router.route('/product/new').post(isAuthenticatedUser, authorizeRole('admin'), createProduct);

router.route('/product/:id').put(isAuthenticatedUser, authorizeRole('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRole('admin'), deleteProducts).get(getSingleProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;