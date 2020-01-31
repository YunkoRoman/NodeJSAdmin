module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define('admins', {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING,
        },
        login: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        restaraunt_id: {
            type: DataTypes.INTEGER,
        },

    }, {
        tableName: 'admins',
        timestamps: false
    });

    return admin
};