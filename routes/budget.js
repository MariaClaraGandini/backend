const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Rota para registro de usuário
router.post('/create', budgetController.create);


module.exports = router;