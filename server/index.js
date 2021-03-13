// 3rd dependencies
const winston = require('winston');
require('dotenv').config();
const express = require('express');

// Init app
const app = express();

// require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

// Open PORT
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
	winston.info(`http://localhost:${PORT}/`);
});

module.exports = server;
