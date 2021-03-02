// 3rd dependencies
const express = require('express');
const router = express.Router();

// Controller
const authController = require('../controllers/auth.Controller');

//--------------------------------------------api/auth/...-------------------------------

//--------------------------------------------POST-----------------------------------------------
//... post categories
router.post('/', authController.post);

module.exports = router;
