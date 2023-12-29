module.exports = (sequelize, DataTypes) => {
    const TrackingExam = sequelize.define("trackingExam", {
        trackingID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: {
                field: 'userID',
                references: {
                    model: 'users',
                    key: 'userID'
                }
            }
        },
        examID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: {
                field: 'examID',
                references: {
                    model: 'exams',
                    key: 'examID'
                }
            }
        },
        questionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        selectedAnswer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        turnID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });
    return TrackingExam;
};