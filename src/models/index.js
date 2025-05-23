const { Sequelize, DataTypes } = require('sequelize');

/*const sequelize = new Sequelize('db_a25c05_pymex', 'db_a25c05_pymex_admin', 'fynged-xazwi2-Tacrej', {
  dialect: 'mssql',
  host: 'sql8020.site4now.net', // 👈 ESTA línea es la clave
  port: 1433,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    }
  },
  logging: false
});*/

// Crear instancia de Sequelize usando variables del .env
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mssql',
    host: process.env.DB_SERVER,
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // convierte a booleano
        trustServerCertificate: true,
      }
    },
    logging: false
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.KDrama = require('./kdrama.model')(sequelize, DataTypes);
db.UserKDrama = require('./userKdrama.model')(sequelize, DataTypes);

// Relaciones
db.User.hasMany(db.UserKDrama, { foreignKey: 'idUser' });
db.KDrama.hasMany(db.UserKDrama, { foreignKey: 'idKDrama' });
db.UserKDrama.belongsTo(db.User, { foreignKey: 'idUser' });
db.UserKDrama.belongsTo(db.KDrama, { foreignKey: 'idKDrama' });

module.exports = db;