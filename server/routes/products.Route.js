// 3rd dependencies
const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth.Middleware');
const admin = require('../middleware/admin.Middleware');

// Controller
const productsController = require('../controllers/products.Controller');

//---------------------------------------------api/products/...---------------------------------

//--------------------------------------------GET-----------------------------------------------

//... get all product belong to category
router.get('/category/:categoryID', productsController.get_productsWithCategory);

//... get one product
router.get('/:_id', productsController.get_oneProduct);

//... get all products
router.get('/', productsController.get_allProducts);

//--------------------------------------------POST-----------------------------------------------

//... post product
router.post('/', [ auth, admin ], productsController.post);

//--------------------------------------------PUT-----------------------------------------------

//... put product
router.put('/:_id', [ auth, admin ], productsController.put);

//--------------------------------------------PATCH-----------------------------------------------

//... soft delete product
router.delete('/:_id', [ auth, admin ], productsController.delete);

module.exports = router;
