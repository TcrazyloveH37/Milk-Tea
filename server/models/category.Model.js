// 3rd dependencies
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{ versionKey: false },
);

const Category = mongoose.model('categories', categorySchema);

const validateCategory = async category => {
	const categoryVerified = {};
	const errors = {};

	// Name
	if (!category.name) {
		errors.name = 'Loại Sản Phẩm Phải Có Tên';
	}
	else if (category.name && (typeof category.name !== 'string' || category.name.length > 50)) {
		errors.name = 'Độ Dài Tên Sản Phẩm Phải  <= 50';
	}
	else if (category.name) categoryVerified.name = category.name;

	if (Object.keys(errors).length >= 1) {
		return {
			errors,
			categoryVerified: null,
		};
	}

	return {
		errors: null,
		categoryVerified,
	};
};

module.exports = { Category, validateCategory };
