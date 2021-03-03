const express = require('express');
const route = require('../routes/index.Route');
const unexpectedError = require('../middleware/unexpectedError.Middleware');

module.exports = function(app) {
	// Middleware
	app.use(express.json());

	// Routes init
	route(app);

	// Route Unexpected Error
	app.use(unexpectedError);
};
