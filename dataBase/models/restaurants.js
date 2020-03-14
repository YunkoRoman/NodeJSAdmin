module.exports = (sequelize, DataTypes) => {
    const restaurants = sequelize.define('restaurants', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        path_to_img:{
            type: DataTypes.STRING
        }
    }, {
        tableName: 'restaurants',
        timestamps: false
    });


    return restaurants
};