// src/routes/userKdrama.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userKdrama.controller');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: UserKDrama
 *   description: Endpoints para gestionar relación usuario-KDrama
 */

/**
 * @swagger
 * /api/user-kdramas:
 *   post:
 *     summary: Crear relación usuario-KDrama
 *     tags: [UserKDrama]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idKDrama, rating, review]
 *             properties:
 *               idKDrama:
 *                 type: integer
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 *               finished:
 *                 type: boolean
 *               recommend:
 *                 type: boolean
 *               watchedOn:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Registro creado
 *       500:
 *         description: Error del servidor
 *
 *   get:
 *     summary: Obtener los KDramas del usuario
 *     tags: [UserKDrama]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros
 *       500:
 *         description: Error del servidor
 */
router.post('/', auth, controller.createUserKDrama);
router.get('/', auth, controller.getUserKDramas);

/**
 * @swagger
 * /api/user-kdramas/{id}:
 *   delete:
 *     summary: Eliminar un registro de usuario-KDrama
 *     tags: [UserKDrama]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminado con éxito
 *       404:
 *         description: No encontrado o no autorizado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', auth, controller.deleteUserKDrama);

module.exports = router;