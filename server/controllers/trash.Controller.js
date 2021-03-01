// 3rd dependencies

// Models
const { Trash, validateObjectIDOfTrash } = require('../models/trash.Model');
const { validateObjectIDOfCategory } = require('../models/category.Model');
const { Product } = require('../models/product.Model');

// Constant
const { default: { CATEGORY_ID } } = require('../config/const');

// ctr
const trashController = {};

//------------------------------------.../api/trash/...----------------------

//------------------------------------[GET]----------------------------------

// /api/trash/category/not-found-categoryID   // get all products in the trash
trashController.get_productsWithNoCategory = async (req, res) => {
	let allProducts = await Trash.find().populate('categories');

	allProducts = allProducts.filter(ap => ap._doc.categories.length === 0);

	res.send(allProducts);
};

// /api/trash/category/:categoryID   // get all products belong category
trashController.get_productsWithCategory = async (req, res) => {
	const objError = await validateObjectIDOfCategory([ req.params.categoryID ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const product = await Trash.find({ categories: { _id: req.params.categoryID } }).populate(
		'categories'
	);

	return res.status(200).send(product);
};

// /api/trash/:_id              // get one product in the trash
trashController.get_oneProduct = async (req, res) => {
	const objError = await validateObjectIDOfTrash([ req.params._id ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const product = await Trash.findById(req.params._id).populate('categories');

	return res.status(200).send(product);
};

// /api/trash/                  // get all products in the trash
trashController.get_allProducts = async (req, res) => {
	const allProducts = await Trash.find().populate('categories');

	res.send(allProducts);
};

//-----------------------------------DELETE----------------------------------

// [DELETE] /api/trash/move/:_id
// move from trashModel to productsModel
trashController.MoveFromTrashToProducs = async (req, res) => {
	const objError = await validateObjectIDOfTrash([ req.params._id ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const { _doc: product } = {
		...(await Trash.findByIdAndDelete(req.params._id).populate('categories'))
	};

	if (product.categories.length === 0) product.categories = [ CATEGORY_ID ];

	const moveProduct = await new Product(product).save();

	return res.status(200).send(moveProduct);
};

//-----------------------------------DELETE----------------------------------

// [DELETE] /api/trash/delete/:_id
// delete in DB
trashController.deleteInDB = async (req, res) => {
	const objError = await validateObjectIDOfTrash([ req.params._id ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const deletedProduct = await Trash.findByIdAndDelete(req.params._id);

	return res.status(200).send(deletedProduct);
};

module.exports = trashController;
