const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class attendanceRoll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.attendanceGroups);
      this.hasOne(models.attendance);
      this.hasMany(models.attendanceRecorded);
    }
  }
  attendanceRoll.init(
    {
      attendanceGroupId: DataTypes.INTEGER,
      time: DataTypes.TIME,
      start: DataTypes.DATEONLY,
      end: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'attendanceRoll',
    }
  );
  return attendanceRoll;
};
