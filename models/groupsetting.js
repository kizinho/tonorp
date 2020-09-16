const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.attendanceGroups);
    }
  }
  groupSetting.init(
    {
      chatLocked: DataTypes.BOOLEAN,
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longtitude: {
        type: DataTypes.STRING,
        allowNull: true
      },
      goeFence: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
    },

    
    
    {
      sequelize,
      modelName: 'groupSetting',
    }
  );
  return groupSetting;
};

