module.exports = (sequelize, DataType) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Task.associate = models => {
    Task.belongsTo(models.User);
  };

  return Task;
};
