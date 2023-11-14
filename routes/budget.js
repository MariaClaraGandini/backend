const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Rota para registro de usuário
router.post('/create', budgetController.create);
router.get('/getAll', budgetController.getAll); 


module.exports = router;