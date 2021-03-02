module.exports = function(req, res, next) {
	if (!req.user.isAdmin)
		return res.status(403).send({
			errors: {
				token: 'Chỉ Admin Được Truy Cập'
			}
		});

	next();
};
