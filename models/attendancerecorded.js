const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class attendanceRecorded extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.attendance);
      this.belongsTo(models.meeting);
      this.belongsTo(models.attendanceRoll);
    }
  }
  attendanceRecorded.init(
    {
      attendanceId: DataTypes.INTEGER,
      meetingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      attendanceRollId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'attendanceRecorded',
    }
  );
  return attendanceRecorded;
};
