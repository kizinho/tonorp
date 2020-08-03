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
      this.belongsTo(models.User);
    }
  }
  attendance.init(
    {
      attendance_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
      },
    },
    {
      sequelize,
      modelName: 'attendance',
    }
  );
  return attendance;
};
