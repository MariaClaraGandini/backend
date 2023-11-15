const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Rota para registro de usuário
router.post('/create', eventController.create);
router.get('/getAll', eventController.getAll);
router.get('/getEvent/:id', eventController.getEvent);
router.put('/edit/:id', eventController.edit)
router.delete('/delete/:id', eventController.edit)




module.exports = router;