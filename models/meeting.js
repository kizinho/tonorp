const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.attendanceGroups);
      this.hasOne(models.attendance);
    }
  }
  meeting.init(
    {
      attendanceGroupId: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'meeting',
    }
  );
  return meeting;
};
