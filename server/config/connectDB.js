const mongoose = require('mongoose');

const URL = 'mongodb://localhost/PhuongAnh';

async function connectToDB() {
	try {
		await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('Connect successfully!!!');
	} catch (error) {
		console.log('Connect failure!!!');
	}
}

module.exports = { connectToDB };
