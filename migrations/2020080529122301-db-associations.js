module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('attendanceGroups', 'ownerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('attendanceGroups', 'UserId');
  },
};
