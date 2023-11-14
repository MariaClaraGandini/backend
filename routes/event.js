const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Rota para registro de usuário
router.post('/create', eventController.create);
router.get('/getAll', eventController.getAll); 



module.exports = router;