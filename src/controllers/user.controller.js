// controllers/user.controller.js
const db = require('../models');
const User = db.User;
const UserKDrama = db.UserKDrama; 
const KDrama = db.KDrama;

exports.getProfile = async (req, res) => {
  try {
    console.log("Usuario autenticado con ID:", req.userId);

    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email'], 
      include: {
        model: UserKDrama,
        //attributes: ['rating', 'review'], 
        include: {
          model: KDrama,
          attributes: ['idKDrama', 'title'] 
        }
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error("Error en getProfile:", err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { username } = req.body;
    user.username = username || user.username;
    await user.save();

    res.json({ message: 'Perfil actualizado', user });
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    res.status(500).json({ error: 'Error al actualizar perfil', details: err.message });
  }
};