module.exports = function(handler) {
	return async (res, req, next) => {
		try {
			await handler(res, req);
		} catch (ex) {
			next(ex);
		}
	};
};
