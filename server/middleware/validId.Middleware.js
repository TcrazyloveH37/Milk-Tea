const ObjectID = require('mongoose').Schema.Types.ObjectId;

module.exports = function(req, res, next) {
	if (!ObjectID.isValid(req.body._id)) {
		return res.send(400).send({ errors: { _id: '_id không hợp lệ' } });
	}
	next();
};
