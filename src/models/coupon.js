module.exports = (Sequelize, DataTypes) => {
  const Coupon = Sequelize.define('Coupon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      required: true,
    },
    coupon: {
      type: DataTypes.STRING,
      required: true,
    },
    couponToken: {
      type: DataTypes.STRING,
      required: true,
    },
    minimumAmount: {
      type: DataTypes.DECIMAL(10, 5),
      required: true
    },
    maximumAmount: {
      type: DataTypes.DECIMAL(10, 5),
      required: true
    },
    discountType: {
      type: DataTypes.STRING,
      required: true
    },
    discount: {
      type: DataTypes.DECIMAL(10, 5),
      required: true
    },
    expiryDate: {
      type: DataTypes.DATE,
      required: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      required: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      required: true,
    }
  }, {});
  Coupon.associate = (models) => {
    Coupon.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Coupon;
};