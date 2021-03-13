const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

const URL = config.get('db');

module.exports = async function () {
	await mongoose.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	winston.info(`Connected to ${URL}...`);
};
