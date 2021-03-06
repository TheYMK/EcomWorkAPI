const { check } = require('express-validator');

exports.userSignupValidator = [
	check('name').not().isEmpty().withMessage('Name is required'),
	check('email').isEmail().withMessage('Must be a valid email address'),
	check('password').isLength({ min: 6 }).withMessage('Password must be at lease 6 characters long'),
	check('role').not().isEmpty().withMessage('User role is required')
];

exports.userSigninValidator = [
	check('email').isEmail().withMessage('Must be a valid email address'),
	check('password').isLength({ min: 6 }).withMessage('Password must be at lease 6 characters long')
];

exports.forgotPasswordValidator = [
	check('email').not().isEmpty().isEmail().withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
	check('newPassword').not().isEmpty().isLength({ min: 6 }).withMessage('Password must be at lease 6 characters long')
];
