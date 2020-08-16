module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groupSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chatLocked: {
        type: Sequelize.BOOLEAN,
      },
      attendanceGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attendanceGroups',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('groupSettings');
  },
};
