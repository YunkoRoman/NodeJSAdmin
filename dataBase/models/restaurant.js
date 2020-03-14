module.exports = (sequelize, DataTypes) => {
    const restaurant = sequelize.define('restaurant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        path_to_img: {
            type: DataTypes.STRING,
        },

    }, {
        tableName: 'restaurants',
        timestamps: false
    });


    return restaurant
};