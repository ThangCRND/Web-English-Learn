module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define("result", {
        resultID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
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
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        turnID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, {
        timestamps: false,
    });

    return Result;
};