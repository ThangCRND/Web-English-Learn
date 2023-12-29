module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("answer", {
        answerID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        questionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: {
                field: 'questionID',
                references: {
                    model: 'question',
                    key: 'questionID'
                }
            }
        },
        examID: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        correctAnswer: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });

    return Answer;
};