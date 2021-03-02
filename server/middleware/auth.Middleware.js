const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token)
		return res.status(401).send({
			errors: {
				token: 'Không Có Token Để Truy Cập'
			}
		});

	try {
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		req.user = decoded;
		next();
	} catch (ex) {
		return res.status(400).send({
			errors: {
				token: 'Không Hợp Lệ'
			}
		});
	}
};
