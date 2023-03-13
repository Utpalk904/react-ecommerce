const express = require('express');
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, changeUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/users').get(isAuthenticatedUser, authorizeRole('admin'), getAllUsers);

router.route('/user/:id').get(isAuthenticatedUser, authorizeRole('admin'), getSingleUser).patch(isAuthenticatedUser, authorizeRole('admin'), changeUserRole).delete(isAuthenticatedUser, authorizeRole('admin'), deleteUser);

module.exports = router;