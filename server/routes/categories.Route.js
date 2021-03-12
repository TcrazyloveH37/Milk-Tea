// 3rd dependencies
const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth.Middleware');
const admin = require('../middleware/admin.Middleware');

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
router.post('/', [ auth, admin ], categoriesController.post);

//--------------------------------------------PUT-----------------------------------------------
//... put categories
router.put('/:_id', [ auth, admin ], categoriesController.put);

//--------------------------------------------DELETE-----------------------------------------------
//... delete categories
router.delete('/:_id', [ auth, admin ], categoriesController.delete);

module.exports = router;
