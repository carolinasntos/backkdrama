const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints para gestionar perfil de usuario
 */
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       500:
 *         description: Error del servidor
 *
 *   put:
 *     summary: Actualizar perfil del usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get('/me', authMiddleware, userController.getProfile);

router.put('/me', authMiddleware, userController.updateProfile);

module.exports = router;