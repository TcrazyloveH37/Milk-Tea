// 3rd dependencies
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User } = require('../models/user.Model');

// Crt
const authController = {};

//-----------------------------------.../api/users/-------------------
authController.post = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(400).send({ errors: { message: 'Email Hoặc Password Không Hợp Lệ' } });

	const validPassword = bcrypt.compare(req.body.password, user.password);

	if (!validPassword)
		return res.status(400).send({ errors: { message: 'Email Hoặc Password Không Hợp Lệ' } });

	const token = user.generateAuthToken();

	return res.status(200).send({ jwt: token });
};

module.exports = authController;
