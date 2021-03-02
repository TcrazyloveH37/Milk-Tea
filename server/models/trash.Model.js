//3rd dependencies
const mongoose = require('mongoose');

// Config
const { validateObjectID } = require('../config/validateObjectID');

const trashSchema = new mongoose.Schema(
	{
		// required
		name: { type: String, default: 'Sản Phẩm Chưa Có Tên' },
		price: { type: Number, default: 0 },
		categories: [ { type: mongoose.Schema.Types.ObjectId, ref: 'categories' } ],
		// not required
		saleOff: { type: Number, default: 0 },
		descriptions: { type: Object, default: {} },
		dateOfDelete: { type: Date, default: Date.now() }
	},
	{ versionKey: false, minimize: false }
);

const Trash = new mongoose.model('trash', trashSchema, 'trash');

const validateObjectIDOfTrash = async productsID => {
	return await validateObjectID(productsID, 'productsID', Trash);
	// const errors = {};
	// errors.productsID = {};

	// for (let id of productsID) {
	// 	if (!ObjectID.isValid(id)) {
	// 		errors.productsID[id] = 'Sản Phẩm Không Hợp Lệ';
	// 		continue;
	// 	}

	// 	const product = await Trash.findById(id);
	// 	if (!product) {
	// 		errors.productsID[id] = 'Sản Phẩm Không Tồn Tại';
	// 	}
	// }

	// if (Object.keys(errors.productsID).length >= 1) return errors;

	// return null;
};

module.exports = { trashSchema, Trash, validateObjectIDOfTrash };
