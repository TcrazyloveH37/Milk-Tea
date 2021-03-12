// 3rd dependencies

// Model
const { Product, validateProduct } = require('../models/product.Model');

// Middelware
const asyncMiddleware = require('../middleware/async.Middleware');

const productsController = {};

//-----------------------------------GET----------------------------------

// [get] /api/products/category/:categoryID
productsController.get_productsWithCategory = asyncMiddleware(async (req, res) => {
	const products = await Product.find({ categories: { _id: req.params.categoryID } }).populate(
		'categories'
	);

	if (!products) return res.status(400).send([]);

	return res.status(200).send(products);
});

// [get] /api/products/:_id
productsController.get_oneProduct = asyncMiddleware(async (req, res) => {
	const product = await Product.findById(req.params._id).populate('category');

	if (!product) return res.status(400).send({ errors: 'Id Không Hợp Lệ' });

	return res.status(200).send(product);
});

// [get] /api/products/
productsController.get_allProducts = async (req, res) => {
	const allProducts = await Product.find().populate('category');

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
productsController.put = asyncMiddleware(async (req, res) => {
	const { errors, productVerified } = await validateProduct(req.body);
	if (!productVerified) return res.status(404).send({ errors: { ...errors } });

	const newProduct = await Product.findByIdAndUpdate(req.params._id, productVerified, {
		new: true
	});

	if (!newProduct) return res.status(400).send({ errors: 'Không Tìm Thấy ID Hợp Lệ' });

	return res.status(200).send(newProduct);
});

//-----------------------------------DELETE----------------------------------

// [patch] /api/products/:_id
// soft delete product
productsController.delete = asyncMiddleware(async (req, res) => {
	const product = await Product.findByIdAndDelete(req.params._id);

	if (!product) return res.status(400).send({ errors: 'Không Tìm Thấy ID Hợp Lệ' });

	return res.status(200).send(product);
});

module.exports = productsController;
