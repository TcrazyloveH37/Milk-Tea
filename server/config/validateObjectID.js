// 3rd dependencies
const ObjectID = require('mongoose').Types.ObjectId;

const validateObjectID = async (arrayID, nameError, Model) => {
	const errors = {};
	errors[nameError] = {};

	for (let id of arrayID) {
		if (!ObjectID.isValid(id)) {
			errors[nameError][id] = 'ID Không Hợp Lệ';
			continue;
		}

		const product = await Model.findById(id);
		if (!product) {
			errors[nameError][id] = 'ID Không Tồn Tại';
		}
	}

	if (Object.keys(errors[nameError]).length >= 1) return errors;

	return null;
};

module.exports = { validateObjectID };
