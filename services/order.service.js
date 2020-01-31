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
}

module.exports = new Order_Service();