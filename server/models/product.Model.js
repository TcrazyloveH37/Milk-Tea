// 3rd dependencies
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
const { validateObjectIDOfCategory } = require('./category.Model');

// CONSTANT
const { default: { CATEGORY_ID } } = require('../config/const');

const productSchema = new mongoose.Schema(
	{
		// required
		name: { type: String, default: 'Sản Phẩm Chưa Có Tên' },
		price: { type: Number, default: 0 },
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'categories',
				default: CATEGORY_ID
			}
		],
		// not required
		saleOff: { type: Number, default: 0 },
		descriptions: { type: Object, default: {} },
		dateOfSale: { type: Date, default: Date.now() }
	},
	{ versionKey: false, minimize: false }
);

const Product = mongoose.model('products', productSchema);

const validateProduct = async product => {
	const productVerified = {};
	const errors = {};

	// Name
	if (product.name && (typeof product.name !== 'string' || product.name.length > 100)) {
		errors.name = 'Độ Dài Tên Sản Phẩm Chỉ Được <= 100';
	}
	else if (product.name) productVerified.name = product.name;

	// Price
	if (product.price && (typeof product.price !== 'number' || product.price < 0)) {
		errors.price = 'Giá Sản Phẩm Cần Là Số >= 0';
	}
	else if (product.price) productVerified.price = product.price;

	// Saleoff
	if (
		product.saleOff &&
		(typeof product.saleOff !== 'number' || product.saleOff < 0 || product.saleOff > 100)
	) {
		errors.saleOff = 'Phẩn Trăm Giảm Giá Là Số >= 0% và <= 100%';
	}
	else if (product.saleOff) productVerified.saleOff = product.saleOff;

	// Descriptions
	if (product.descriptions && typeof product.descriptions !== 'object') {
		errors.descriptions = 'Phần Mô Tả Không Hợp Lệ';
	}
	else if (product.descriptions) productVerified.descriptions = product.descriptions;

	// CategoryIDcategoryIDs
	if (product.categories && Array.isArray(product.categories) && product.categories.length >= 1) {
		const objError = await validateObjectIDOfCategory(product.categories);
		if (objError !== null) {
			errors.categories = objError.categoriesID;
		}
		else {
			productVerified.categories = [];
			for (let id of product.categories) {
				productVerified.categories.push(id);
			}
		}
	}
	else if (product.categories && !Array.isArray(product.categories)) {
		errors.categories = 'Loại Sản Phẩm Không Hợp Lệ';
	}
	else {
		productVerified.categories = [ CATEGORY_ID ];
	}

	if (Object.keys(errors).length >= 1) {
		return {
			errors,
			productVerified: null
		};
	}

	return {
		errors: null,
		productVerified
	};
};

const validateObjectIDOfProduct = async productsID => {
	const errors = {};
	errors.productsID = {};

	for (let id of productsID) {
		if (!ObjectID.isValid(id)) {
			errors.productsID[id] = 'Sản Phẩm Không Hợp Lệ';
			continue;
		}

		const product = await Product.findById(id);
		if (!product) {
			errors.productsID[id] = 'Sản Phẩm Không Tồn Tại';
		}
	}

	if (Object.keys(errors.productsID).length >= 1) return errors;

	return null;
};

module.exports = { Product, validateProduct, validateObjectIDOfProduct };
