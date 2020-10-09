const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class personalMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: 'sender' });
      this.belongsTo(models.User, { as: 'receiver' });
    }
  }

  personalMessage.init(
    {
      message: {
        type: DataTypes.TEXT,
      },
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'personalMessage',
    }
  );

  return personalMessage;
};

