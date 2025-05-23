// src/routes/userKdrama.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userKdrama.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, controller.createUserKDrama);
router.get('/', auth, controller.getUserKDramas);
router.delete('/:id', auth, controller.deleteUserKDrama);

module.exports = router;