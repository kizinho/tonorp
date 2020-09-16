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
      start: {
        type: Sequelize.DATE,
      },
      end: {
        type: Sequelize.DATE,
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

