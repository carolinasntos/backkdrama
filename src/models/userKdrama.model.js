module.exports = (sequelize, DataTypes) => {
  const UserKDrama = sequelize.define('UserKDrama', {
    idUserKDrama: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUser: DataTypes.INTEGER,
    idKDrama: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    recommend: DataTypes.BOOLEAN,
    watchedOn: DataTypes.DATE
  }, {
    tableName: 'UserKDrama',
    schema: 'CarolinaSchema',
    timestamps: false
  });

  UserKDrama.associate = models => {
    UserKDrama.belongsTo(models.User, { foreignKey: 'idUser' });
    UserKDrama.belongsTo(models.KDrama, { foreignKey: 'idKDrama' });
  };

  return UserKDrama;
};