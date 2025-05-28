const express = require('express');
const router = express.Router();
const kdramaController = require('../controllers/kdrama.controller');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: KDrama
 *   description: Endpoints para gestionar KDramas
 */

/**
 * @swagger
 * /api/kdramas:
 *   get:
 *     summary: Obtener todos los KDramas
 *     tags: [KDrama]
 *     responses:
 *       200:
 *         description: Lista de KDramas
 *       500:
 *         description: Error del servidor
 *
 *   post:
 *     summary: Crear un nuevo KDrama
 *     tags: [KDrama]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               episodes:
 *                 type: integer
 *               platform:
 *                 type: string
 *     responses:
 *       201:
 *         description: KDrama creado
 *       500:
 *         description: Error del servidor
 */

router.get('/', kdramaController.getAllKDramas);
router.post('/', authMiddleware, kdramaController.createKDrama);

module.exports = router;