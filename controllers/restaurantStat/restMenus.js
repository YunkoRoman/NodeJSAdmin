const tokenVerif = require("../../helpers/tokenVerifikator");

const ControllerError = require('../../errors/ControllerError');
const {restStat} = require('../../services');

module.exports = async (req, res, next) => {

    try {

        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {restaurant_id} = tokenVerif.auth(token);
        const menuList = await restStat.getMenuList(restaurant_id);

        res.json({
            success: true,
            msg:menuList
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/restaurantStat/prodStat'))
    }
};
