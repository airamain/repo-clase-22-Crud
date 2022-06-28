const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middleware
const uploadFile = require('../middleware/multerMiddleware');
const validations = require('../middleware/validateRegisterMiddleware');

// Formulario de Registro
router.get('/register', usersController.register);

// Regristo
router.post('/register', uploadFile.single('avatar') , validations, usersController.proccesRegister);

// From Login
router.get('/login', usersController.login);

// Login
router.post('/login', usersController.loginProcess);

// Perfil usuario
router.get('/profile', usersController.profile);

// Logout
router.post('/logout', usersController.logout)

module.exports = router;