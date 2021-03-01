// 3rd dependencies

// Model
const { Product, validateProduct, validateObjectIDOfProduct } = require('../models/product.Model');
const { validateObjectIDOfCategory } = require('../models/category.Model');
const { Trash } = require('../models/trash.Model');

const productsController = {};

//-----------------------------------GET----------------------------------

// [get] /api/products/category/:categoryID
productsController.get_productsWithCategory = async (req, res) => {
	const objError = await validateObjectIDOfCategory([ req.params.categoryID ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const product = await Product.find({ categories: { _id: req.params.categoryID } }).populate(
		'categories'
	);

	return res.status(200).send(product);
};

// [get] /api/products/:_id
productsController.get_oneProduct = async (req, res) => {
	const objError = await validateObjectIDOfProduct([ req.params._id ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const product = await Product.findById(req.params._id).populate('categories');

	return res.send(product);
};

// [get] /api/products/
productsController.get_allProducts = async (req, res) => {
	const allProducts = await Product.find().populate('categories');

	res.send(allProducts);
};

//-----------------------------------POST----------------------------------

// [post] /api/products
productsController.post = async (req, res) => {
	const { errors, productVerified } = await validateProduct(req.body);
	if (!productVerified) return res.status(404).send({ errors: { ...errors } });

	const newProduct = await new Product(productVerified).save();

	return res.status(200).send(newProduct);
};

//-----------------------------------PUT----------------------------------

// [put] /api/products/:_id
productsController.put = async (req, res) => {
	const objError = await validateObjectIDOfProduct([ req.params._id ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const { errors, productVerified } = await validateProduct(req.body);
	if (!productVerified) return res.status(404).send({ errors: { ...errors } });

	const newProduct = await Product.findByIdAndUpdate(req.params._id, productVerified, {
		new: true
	});

	return res.status(200).send(newProduct);
};

//-----------------------------------DELETE----------------------------------

// [patch] /api/products/:_id
// soft delete product
productsController.delete = async (req, res) => {
	const objError = await validateObjectIDOfProduct([ req.params._id ]);
	if (objError !== null) return res.status(404).send({ errors: { ...objError } });

	const { _doc: product } = { ...(await Product.findByIdAndDelete(req.params._id)) };
	const deletedProduct = await new Trash(product).save();

	return res.status(200).send(deletedProduct);
};

module.exports = productsController;
