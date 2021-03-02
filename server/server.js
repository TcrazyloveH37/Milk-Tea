// 3rd dependencies
const config = require('config');
require('dotenv').config();
const express = require('express');

// My config
if (!config.get('jwtPrivateKey')) {
	console.error('FATAL ERROR: jwtPrivateKey is not define');
	process.exit(1);
}
const { connectToDB } = require('./config/connectDB');

//My routes
const route = require('./routes/index.Route');

// Init app
const app = express();
const PORT = process.env.PORT || 9001;
connectToDB();

// Middleware
app.use(express.json());

// Routes init
route(app);

// Open PORT\
app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}/`);
});

// Test
// console.log(process.env.VIETNAM);
