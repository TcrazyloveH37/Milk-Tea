const winston = require('winston');

module.exports = function(err, req, res, next) {
	winston.error(err.message, err);

	return res.status(500).send({ errors: err.message });
};
