module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define('orders', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            restaurant_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            status_id: {
                type: DataTypes.INTEGER,
            },
            date: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'orders',
            timestamps: false
        });
    // const order_line = sequelize.import('./orderLine');
    // orders.hasMany(order_line, {foreignKey:'order_id'});

    return orders
};