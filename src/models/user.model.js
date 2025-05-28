module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      field: 'idUser',   
      primaryKey: true,
      autoIncrement: true
    },
    username: { type: DataTypes.STRING, allowNull: false },
    email:    { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
  },{
    tableName: 'User',
    schema: 'CarolinaSchema',
    timestamps: false
  });

  return User; 
};