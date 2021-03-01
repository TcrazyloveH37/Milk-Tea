// 3rd dependencies
const express = require('express');
const router = express.Router();

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
router.post('/', productsController.post);

//--------------------------------------------PUT-----------------------------------------------

//... put product
router.put('/:_id', productsController.put);

//--------------------------------------------PATCH-----------------------------------------------

//... soft delete product
router.delete('/:_id', productsController.delete);

module.exports = router;
