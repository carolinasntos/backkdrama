const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // 🔴 <--- ESTE CAMPO ES OBLIGATORIO
    info: {
      title: 'KDrama API',
      version: '1.0.0',
      description: 'Documentación de la API de K-Dramas',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // Ajusta a tu estructura real
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };