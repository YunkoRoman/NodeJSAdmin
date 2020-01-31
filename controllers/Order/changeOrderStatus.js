const {orderService} = require('../../services');
const ControllerError = require('../../errors/ControllerError');

module.exports = async (req, res, next) => {
    
    try {
        const {order_id, status_id} = req.body;

        const change_status = orderService.changeStatus(order_id, status_id);
        console.log(change_status);

        res.json({
            success: true,
            msg: change_status
        });

    }catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/Order/status_order'))
    }
    
}