const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');

router.get('/videos', videosController.exibirvideos);



module.exports = router;
