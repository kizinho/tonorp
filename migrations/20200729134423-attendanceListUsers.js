module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('attendanceListUsers', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      attendanceListId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface) => {
    queryInterface.dropTable('attendanceListUsers');
  },
};
