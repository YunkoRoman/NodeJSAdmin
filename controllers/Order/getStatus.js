const ControllerError = require('../../errors/ControllerError');
const {orderService} = require('../../services');
module.exports = async (req, res, next) => {
    try {
        const {id: restaurant_id} = req.params;
        console.log(restaurant_id);
        const statuses = await orderService.getStatus(restaurant_id);

        res.json({
            success: true,
            msg: statuses
        });
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/Order/status_order'))
    }

}