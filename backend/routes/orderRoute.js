const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, authorizeRole('admin'), getSingleOrder).put(isAuthenticatedUser, authorizeRole('admin'), updateOrderStatus).delete(isAuthenticatedUser, authorizeRole('admin'), deleteOrder);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/orders').get(isAuthenticatedUser, authorizeRole('admin'), getAllOrders);

module.exports = router;