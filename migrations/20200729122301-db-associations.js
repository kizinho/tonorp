module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('workspaces', 'UserId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
      .then(() => {
        return queryInterface.addColumn('attendanceLists', 'workspaceId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'workspaces',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        });
      });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('workspace', 'ownerID').then(() => {
      queryInterface.removeColumn('attendanceList', 'workspace');
    });
  },
};
