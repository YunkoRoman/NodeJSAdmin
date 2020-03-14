const ControllerError = require('../../errors/ControllerError');
const {restStat} = require('../../services');
const tokenVerif = require('../../helpers/tokenVerifikator')
module.exports = async (req, res, next) => {

    try {
        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {restaurant_id} = tokenVerif.auth(token);

        const {dateStart, dateEnd} = req.body;

        const statistics = await restStat.restStat(restaurant_id, dateStart, dateEnd);

        res.json({
            success: true,
            msg:statistics
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/restaurantStat/prodStat'))
    }
};
