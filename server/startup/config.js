const config = require('config');

module.exports = function() {
	// My config
	if (!config.get('jwtPrivateKey')) {
		throw new Error('FATAL ERROR: jwtPrivateKey is not define');
	}
};
