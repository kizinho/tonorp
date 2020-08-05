const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendanceGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: 'userGroup' });
      this.belongsTo(models.User, { as: 'owner' });
      this.hasMany(models.messages);
      this.hasOne(models.attendance);
      this.hasOne(models.groupSetting);
    }
  }
  attendanceGroups.init(
    {
      name: DataTypes.STRING,
      groupId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'attendanceGroups',
    }
  );
  return attendanceGroups;
};

