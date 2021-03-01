// 3rd dependencies
const router = require('express').Router();

// Controller
const trashController = require('../controllers/trash.Controller');

//----------------------------------------/api/trash/---------------------------------

//--------------------------------------------GET-----------------------------------------------

//... get all product not belong to category
router.get('/category/not-found-categoryID', trashController.get_productsWithNoCategory);

//... get all product belong to category
router.get('/category/:categoryID', trashController.get_productsWithCategory);

//... get belong to category
router.get('/:_id', trashController.get_oneProduct);

//... get all product
router.get('/', trashController.get_allProducts);

//--------------------------------------------DELETE-----------------------------------------------

//... move product
router.delete('/move/:_id', trashController.MoveFromTrashToProducs);

//--------------------------------------------DELETE-----------------------------------------------

//... delete product
router.delete('/delete/:_id', trashController.deleteInDB);

module.exports = router;
