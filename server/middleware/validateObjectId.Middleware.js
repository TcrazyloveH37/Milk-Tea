const mongoose = require('mongoose');

module.exports = function (req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params._id))
		return res.status(404).send({ errors: 'ID Không Hợp Lệ' });

	next();
};
