module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("userprofile", {
      profileID: {
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },{
        timestamps: false,
    });
    return Profile;
};
  