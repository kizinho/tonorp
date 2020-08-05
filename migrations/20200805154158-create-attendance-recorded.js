module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendanceRecordeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attendanceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'attendances',
          key: 'id',
        },
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendanceRecordeds');
  },
};

