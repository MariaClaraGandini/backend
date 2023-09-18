const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para registro de usuário
router.post('/register', authController.register);

// Rota para login de usuário
router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
