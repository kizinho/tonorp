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
    }
  }
  attendanceRecorded.init(
    {
      attendanceId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'attendanceRecorded',
    }
  );
  return attendanceRecorded;
};
