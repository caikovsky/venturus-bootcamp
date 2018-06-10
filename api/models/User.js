const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING(12),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 12]
      }
    }
  });

  User.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  User.hook('beforeCreate', user => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.associate = models => {
    User.hasMany(models.Task, {
      onDelete: 'CASCADE'
    });
  };

  return User;
};
