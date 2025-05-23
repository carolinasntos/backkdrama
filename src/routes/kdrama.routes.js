const express = require('express');
const router = express.Router();
const kdramaController = require('../controllers/kdrama.controller');
const authMiddleware = require('../middlewares/auth');

router.get('/', kdramaController.getAllKDramas);
router.post('/', authMiddleware, kdramaController.createKDrama);

module.exports = router;