// 3rd dependencies
const mongoose = require('mongoose');
const { Category } = require('./category.Model');
const ObjectID = mongoose.Types.ObjectId;

// CONSTANT
const { default: { CATEGORY_ID } } = require('../config/const');

const productSchema = new mongoose.Schema(
	{
		// required
		name: { type: String, default: 'Sản Phẩm Chưa Có Tên' },
		price: { type: Number, default: 0 },
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'categories',
			default: CATEGORY_ID
		},
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

	// CategoryID
	if (product.category && typeof product.category !== 'string') {
		errors.category = 'ID Loại Sản Phẩm Không Hợp Lệ';
	}
	else if (product.category) {
		if (!ObjectID.isValid(product.category)) errors.category = 'ID Loại Sản Phẩm Không Hợp Lệ';
		else {
			const category = await Category.findById(product.category);

			if (!category) errors.category = 'ID Loại Sản Phẩm Không Tồn Tại';
			else productVerified.category = product.category;
		}
	}
	else productVerified.category = [ CATEGORY_ID ];


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

module.exports = { Product, validateProduct };
