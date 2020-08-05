module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('groupSettings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        chatLocked: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(async () => {
        await queryInterface.addColumn('groupSettings', 'attendanceGroupsId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'attendanceGroups',
            key: 'id',
          },
          onDelete: 'CASCADE',
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groupSettings');
  },
};

