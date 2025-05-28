require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- AÑADE ESTO
const app = express();
const db = require('./models');

app.use(cors()); // <-- AÑADE ESTA LÍNEA
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend en línea Carolina');
});

const { swaggerUi, specs } = require('./swagger'); // Ajusta si está en src/swagger.js
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/kdramas', require('./routes/kdrama.routes'));
app.use('/api/user-kdramas', require('./routes/userKdrama.routes'));

// Sincroniza la base de datos
db.sequelize.sync();

module.exports = app;