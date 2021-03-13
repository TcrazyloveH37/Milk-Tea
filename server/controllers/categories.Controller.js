// Model
const { Category, validateCategory } = require('../models/category.Model');

const { Product } = require('../models/product.Model');

// CONSTANT
const { default: { CATEGORY_ID } } = require('../config/const');

// Middleware
const asyncMiddleware = require('../middleware/async.Middleware');

// Inital ctl
const categoriesController = {};

//-----------------------------------GET----------------------------------
// [GET] /api/categories/:_id 		// get one category
categoriesController.get_oneCategory = asyncMiddleware(async (req, res) => {
	const category = await Category.findById(req.params._id);

	if (!category) return res.status(400).send({ errors: 'ID Không Hợp Lệ' });

	return res.status(200).send(category);
});

// [GET] /api/categories/ 			// get all category
categoriesController.get_allCategories = async (req, res) => {
	const allCategories = await Category.find();

	const sorted = allCategories.sort((a, b) => a.name.localeCompare(b.name));

	return res.status(200).send(sorted);
};

//-----------------------------------POST----------------------------------
// [POST] /api/categories 			// create new category
categoriesController.post = async (req, res) => {
	const { errors, categoryVerified } = await validateCategory(req.body);
	if (categoryVerified === null) return res.status(400).send({ errors: { ...errors } });

	const newCategory = await new Category(categoryVerified).save();

	return res.status(200).send(newCategory);
};

//-----------------------------------PUT----------------------------------
// [PUT] /api/categories/:_id 		// change name category
categoriesController.put = asyncMiddleware(async (req, res) => {
	const { errors, categoryVerified } = await validateCategory(req.body);
	if (!categoryVerified) return res.status(404).send({ errors: { ...errors } });

	const newCategory = await Category.findByIdAndUpdate(req.params._id, categoryVerified, {
		new: true,
	});

	if (!newCategory) return res.status(400).send({ errors: 'ID Không Hợp Lệ' });

	return res.status(200).send(newCategory);
});

//-----------------------------------DELETE----------------------------------
// [DELETE] /api/categories/:_id	// remove all product belong to category and delete catagory
categoriesController.delete = asyncMiddleware(async (req, res) => {
	const product = await Product.find({ category: { _id: req.params._id } }).populate('category');

	if (product.length >= 1)
		return res.status(404).send({ errors: 'Có Các Sản Phẩm Thuộc Loại Này, Không Thể Xoá' });

	const deleteCategory = await Category.findByIdAndDelete(req.params._id);

	if (!deleteCategory) return res.status(400).send({ errors: 'ID Không Hợp Lệ' });

	return res.status(200).send(deleteCategory);
});

module.exports = categoriesController;
