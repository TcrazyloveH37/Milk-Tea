const mongoose = require('mongoose');
const winston = require('winston');

const URL = 'mongodb://localhost/PhuongAnh';

module.exports = async function() {
	await mongoose.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	});
	winston.info('Connect successfully!!!');
};
