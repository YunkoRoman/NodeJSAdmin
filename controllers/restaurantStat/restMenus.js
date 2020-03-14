const ControllerError = require('../../errors/ControllerError');
const {restStat} = require('../../services');

module.exports = async (req, res, next) => {

    try {
        console.log(req.params);
        const {id} = req.params;
        const menuList = await restStat.getMenuList(id);

        res.json({
            success: true,
            msg:menuList
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/restaurantStat/prodStat'))
    }
};
