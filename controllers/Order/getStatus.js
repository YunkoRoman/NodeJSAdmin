
const ControllerError = require('../../errors/ControllerError');

module.exports = async (req, res, next) => {

    try {


    }catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/Order/status_order'))
    }

}