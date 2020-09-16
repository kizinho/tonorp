const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.meeting);
      this.belongsTo(models.attendanceRoll);
      this.hasMany(models.attendanceRecorded);
    }
  }
  attendance.init(
    {
      meetingId: DataTypes.INTEGER,
      attendanceRollId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'attendance',
    }
  );
  return attendance;
};
