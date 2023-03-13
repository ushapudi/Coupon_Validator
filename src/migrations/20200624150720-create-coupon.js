module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Coupons', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      unique: true,
    },
    userId: {
      type: Sequelize.UUID,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    coupon: {
      type: Sequelize.STRING,
      required: true,
    },
    couponToken: {
      type: Sequelize.STRING,
      required: true,
    },
    minimumAmount: {
      type: Sequelize.DECIMAL(10, 5),
      required: true
    },
    maximumAmount: {
      type: Sequelize.DECIMAL(10, 5),
      required: true
    },
    discountType: {
      type: Sequelize.STRING,
      required: true
    },
    discount: {
      type: Sequelize.DECIMAL(10, 5),
      required: true
    },
    expiryDate: {
      type: Sequelize.DATE,
      required: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Coupons')
};