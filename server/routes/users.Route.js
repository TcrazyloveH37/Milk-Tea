// 3rd dependencies
const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth.Middleware');

// Controller
const usersController = require('../controllers/users.Controller');

//--------------------------------------------api/users/...-------------------------------

//--------------------------------------------POST-----------------------------------------------
//... get user
router.get('/me', auth, usersController.get);

//--------------------------------------------POST-----------------------------------------------
//... post new user
router.post('/', usersController.post);

module.exports = router;
