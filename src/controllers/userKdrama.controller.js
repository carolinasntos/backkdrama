// src/controllers/userKdrama.controller.js
const db = require('../models');
const UserKDrama = db.UserKDrama;
const KDrama = db.KDrama; 

exports.createUserKDrama = async (req, res) => {
  try {
    const data = {
      idUser: req.userId, 
      ...req.body
    };
    const registro = await UserKDrama.create(data);
    res.status(201).json({ message: 'Registro creado', registro });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro', details: error.message });
  }
};

exports.getUserKDramas = async (req, res) => {
    try {
      console.log("Usuario autenticado con ID:", req.userId); 
      const registros = await UserKDrama.findAll({
        where: { idUser: req.userId },
        include: {
          model: KDrama,
          attributes: ['idKDrama', 'title']
        }
      });
      res.json(registros);
    } catch (error) {
      console.error("Error en getUserKDramas:", error.message); 
      res.status(500).json({ error: 'Error al obtener los registros', details: error.message });
    }
  };

exports.deleteUserKDrama = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserKDrama.destroy({ where: { idUserKDrama: id, idUser: req.userId } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado o no autorizado' });
    res.json({ message: 'Eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar', details: error.message });
  }
};