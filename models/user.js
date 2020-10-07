const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.attendanceGroups, { through: 'userGroup' });
      this.hasOne(models.attendanceGroups, { as: 'owner' });
      this.hasMany(models.personalMessage, { as: 'sender' });
      this.hasMany(models.personalMessage, { as: 'receiver' });
      this.hasMany(models.message);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
