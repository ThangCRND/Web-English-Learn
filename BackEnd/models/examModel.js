module.exports = (sequelize, DataTypes) => {
    const Exam = sequelize.define("exam", {
      examID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      examStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Reading'
      },
    }, {
      timestamps: false,
    });
   //
    return Exam;
  };