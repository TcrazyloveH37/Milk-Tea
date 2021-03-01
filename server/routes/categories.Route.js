// 3rd dependencies
const express = require('express');
const router = express.Router();

// Controller
const categoriesController = require('../controllers/categories.Controller');

//--------------------------------------------api/categories/...-------------------------------

//--------------------------------------------GET-----------------------------------------------
//... get categories
router.get('/:_id', categoriesController.get_oneCategory);

//... get all categories
router.get('/', categoriesController.get_allCategories);

//--------------------------------------------POST-----------------------------------------------
//... post categories
router.post('/', categoriesController.post);

//--------------------------------------------PUT-----------------------------------------------
//... put categories
router.put('/:_id', categoriesController.put);

//--------------------------------------------DELETE-----------------------------------------------
//... delete categories
router.delete('/:_id', categoriesController.delete);

module.exports = router;
