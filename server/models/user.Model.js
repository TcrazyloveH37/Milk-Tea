// 3rd dependencies
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Config
const { validateObjectID } = require('../config/validateObjectID');

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	isAdmin: Boolean
});

userSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
	return token;
};

const User = mongoose.model('users', userSchema);

const validateObjectIDOfUser = async usersID => {
	return await validateObjectID(usersID, 'categoriesID', User);
};

const validateUser = async user => {
	const userVerified = {};
	const errors = {};

	// Name
	if (user.name) {
		if (typeof user.name !== 'string' || user.name.length > 100) {
			errors.name = 'Độ Dài Tên Sản Phẩm Chỉ Được <= 100';
		}
		else {
			userVerified.name = user.name;
		}
	}
	else errors.name = 'Vui Lòng Nhập Tên';

	// Email
	if (user.email) {
		if (typeof user.email !== 'string' || user.email.length > 50) {
			errors.email = 'Độ Dài Email Chỉ Được <= 50';
		}
		else {
			const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

			if (regex.test(user.email)) {
				userVerified.email = user.email;
			}
			else {
				errors.email = 'Email Không Hợp Lệ';
			}
		}
	}
	else errors.email = 'Vui Lòng Nhập Email';

	// password
	if (user.password) {
		if (
			typeof user.password !== 'string' ||
			user.password.length < 6 ||
			user.password.length > 30
		) {
			errors.password = 'Password có độ dài <= 30 và >= 6';
		}
		else {
			userVerified.password = user.password;
		}
	}
	else errors.password = 'Vui Lòng Nhập Password';

	// // isAdmin
	// if (user.isAdmin) {
	// 	if (typeof user.isAdmin !== 'boolean') {
	// 		errors.isAdmin = 'Lỗi Kiểu Dữ Liệu';
	// 	}
	// 	else {
	// 		userVerified.isAdmin = user.isAdmin;
	// 	}
	// }

	if (Object.keys(errors).length >= 1) {
		return {
			errors,
			userVerified: null
		};
	}

	return {
		errors: null,
		userVerified
	};
};

module.exports = {
	User,
	validateObjectIDOfUser,
	validateUser
};
