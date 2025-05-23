const db = require('../models');
const KDrama = db.KDrama;

exports.createKDrama = async (req, res) => {
  try {
    const drama = await KDrama.create(req.body);
    res.status(201).json(drama);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear KDrama', details: error.message });
  }
};

exports.getAllKDramas = async (req, res) => {
  try {
    const dramas = await KDrama.findAll({
      attributes: ['idKDrama', 'title', 'genre', 'episodes', 'platform']
    });
    res.json(dramas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener KDramas', details: error.message });
  }
};