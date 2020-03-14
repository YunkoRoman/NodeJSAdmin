const dataBase = require('../dataBase').getInstance();
const ControllerError = require('../errors/ControllerError');

class Order_Service {

    getStatus(restaurant_id) {
        const OrderStatusModel = dataBase.getModel('order_status')
        try {

            return OrderStatusModel.findAll({
                where: {
                    restaurant_id
                }
            })

        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'Order_Service/getStatus')
        }
    }

    changeStatus(order_id, status_id) {

        const OrderModel = dataBase.getModel('orders');
        try {

            return OrderModel.update({
                status_id
            }, {
                where: {
                    id: order_id
                }
            })

        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'Order_Service/changeStatus')
        }

    }

   async getCompletedOrders(restaurant_id) {
       const OrdersModel = dataBase.getModel('orders');
       const OrderLineModel = dataBase.getModel('orderLine');
       const OrderStatusModel = dataBase.getModel('order_status');
       const ProductModel = dataBase.getModel('products');
       const MenuModel = dataBase.getModel('menus');
        try {
            const status = await OrderStatusModel.findOne({
                where: {
                    restaurant_id,
                    status: 'Done'
                }
            });
            console.log('Status'+ status);
            const {status_id} = status;
            if (status_id) {
                const result = await OrdersModel.findAll({
                    include: [{
                        model: OrderLineModel,
                        include: [{
                            model: ProductModel,
                            include: [{
                                model: MenuModel
                            }]
                        }]
                    }, {
                        model: OrderStatusModel
                    }],
                    where: {
                        restaurant_id,
                        status_id
                    }
                });
                console.log(result);
                return result
            }
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'Order_Service/getCompletedOrders')
        }
    }
}

module.exports = new Order_Service();