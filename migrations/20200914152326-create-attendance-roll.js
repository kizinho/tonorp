module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendanceRolls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attendanceGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attendanceGroups',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      start: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      end: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('attendanceRolls');
  },
};
