module.exports = (sequelize, DataTypes) => {
  return sequelize.define('KDrama', {
    idKDrama: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    episodes: DataTypes.INTEGER,
    platform: DataTypes.STRING
  }, {
    tableName: 'KDrama',
    schema: 'CarolinaSchema',
    timestamps: false
  });
};