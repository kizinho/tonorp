module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('attendances', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        attendance_id: {
          type: Sequelize.UUID,
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
      .then(() => {
        return queryInterface.addColumn('attendances', 'UserId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendances').then(() => {
      return queryInterface.removeColumn('attendances', 'UserId');
    });
  },
};
