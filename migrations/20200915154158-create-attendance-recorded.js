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
        onDelete: 'CASCADE',
      },
      meetingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'meetings',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      attendanceRollId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attendanceRolls',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('attendanceRecordeds');
  },
};
