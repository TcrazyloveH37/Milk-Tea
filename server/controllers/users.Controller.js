// 3rd dependencies
const _ = require('lodash');

const { User, validateUser } = require('../models/user.Model');

// Crt
const userController = {};

//-----------------------------------.../api/users/-------------------

//--------------------------------------GET---------------------------
// Get current user
userController.get = async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');

	if (!user) return res.status(400).send({ error: 'Tài Khoản Đã Bị Xoá Hoặc Không Tồn Tại' });

	return res.status(200).send(user);
};

//--------------------------------------POST-------------------------
// Create new user
userController.post = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send({ errors: { email: 'Email đã tồn tại' } });

	const { errors, userVerified } = await validateUser(req.body);
	if (userVerified === null) return res.status(400).send({ errors: { ...errors } });

	const newUser = await new User(_.pick(req.body, [ 'name', 'email', 'password' ])).save();

	const token = newUser.generateAuthToken();

	return res
		.header('x-auth-token', token)
		.status(200)
		.send(_.pick(newUser, [ '_id', 'name', 'email' ]));
};

module.exports = userController;
