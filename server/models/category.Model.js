// 3rd dependencies
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true }
	},
	{ versionKey: false }
);

const Category = mongoose.model('categories', categorySchema);

const validateCategory = async category => {
	const categoryVerified = {};
	const errors = {};

	// Name
	if (!category.name) {
		errors.name = 'Loại Sản Phẩm Phải Có Tên';
	}
	else if (category.name && (typeof category.name !== 'string' || category.name.length > 100)) {
		errors.name = 'Độ Dài Tên Sản Phẩm Phải  <= 100';
	}
	else if (category.name) categoryVerified.name = category.name;

	if (Object.keys(errors).length >= 1) {
		return {
			errors,
			categoryVerified: null
		};
	}

	return {
		errors: null,
		categoryVerified
	};
};

const validateObjectIDOfCategory = async categoriesID => {
	const errors = {};
	errors.categoriesID = {};

	for (let id of categoriesID) {
		if (!ObjectID.isValid(id)) {
			errors.categoriesID[id] = 'Loại Sản Phẩm Không Hợp Lệ';
			continue;
		}

		const category = await Category.findById(id);
		if (!category) {
			errors.categoriesID[id] = 'Loại Sản Phẩm Không Tồn Tại';
		}
	}

	if (Object.keys(errors.categoriesID).length >= 1) return errors;

	return null;
};

module.exports = { categorySchema, Category, validateCategory, validateObjectIDOfCategory };
