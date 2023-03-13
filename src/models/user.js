module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Coupon, {
      foreignKey: 'id',
      as: 'userId',
    });
  };
  return User;
};