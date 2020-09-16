module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      meetingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'meetings',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      attendanceRollId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attendanceRolls',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: true,
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
    await queryInterface.dropTable('attendances');
  },
};
