const { generateRandomString } = require('../src/modules/utils/helper');

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
      this.hasMany(models.message);
      this.hasMany(models.meeting);
      this.hasOne(models.groupSetting);
    }
  }
  attendanceGroups.init(
    {
      name: DataTypes.STRING,
      groupId: {
        type: DataTypes.STRING,
        defaultValue: generateRandomString(10),
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
