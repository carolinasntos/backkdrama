const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //const token = req.headers['authorization'];
  const authHeader = req.headers['authorization'];
  //if (!token) return res.status(401).json({ error: 'Token no proporcionado' });
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado o mal formado' });
  }

  const token = authHeader.split(' ')[1]; // ✅ Esto extrae solo el token sin 'Bearer'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};