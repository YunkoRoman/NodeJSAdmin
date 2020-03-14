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
                type: DataTypes.DATE
            },
            total_price: {
                type: DataTypes.INTEGER
            },
            user_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            table_numb:{
                type: DataTypes.INTEGER
            },
            payment_method:{
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'orders',
            timestamps: false
        });
    const order_line = sequelize.import('./orderLine');
    orders.hasMany(order_line, {foreignKey: 'order_id'});

    const orderStatus = sequelize.import('./order_status');
    orders.belongsTo(orderStatus,{foreignKey: 'status_id'});

    const restaurnat = sequelize.import('./restaurant');
    orders.belongsTo(restaurnat, {foreignKey:'restaurant_id'});

    return orders
};