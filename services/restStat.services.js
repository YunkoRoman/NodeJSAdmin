const dataBase = require('../dataBase').getInstance();
const { Op } = require("sequelize");
const ControllerError = require('../errors/ControllerError');

class RestServ {

    async restStat(restaurant_id, dateStart, dateEnd) {

        const OrderLineModel = dataBase.getModel('orderLine');
        const ProductModel = dataBase.getModel('products');
        const MenusModel = dataBase.getModel('menus');

        try {
            const DateStart = new Date(new Date(dateStart).setHours(2,0,0,0));
            const DateEnd = new Date(new Date(dateEnd).setHours(25,59,59,59));
            const statistics = await OrderLineModel.findAll({
                include: [{
                    model: ProductModel,
                    include: {
                        model: MenusModel
                    }
                },
                ],
                where: {
                    restaurant_id,
                    date: {
                        [Op.lte]: DateEnd,
                        [Op.gte]: DateStart
                    }

                }
            });
            let output = [];
            statistics.forEach(function (item) {
                let existing = output.filter(function (v) {
                    return v.product_id === item.product_id;
                });
                if (existing.length) {
                    let existingIndex = output.indexOf(existing[0]);
                    output[existingIndex].qtt = output[existingIndex].qtt + item.qtt
                } else {
                    output.push(item);
                }
            });

            output.sort((a, b) => {
                return b.qtt - a.qtt
            });
            return output

        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'restStat.services/restStat')
        }
    }

    getMenuList(restaurant_id) {
        const MenuModel = dataBase.getModel('menus');
        try {
            return MenuModel.findAll({
                where: {
                    restaurant_id
                }
            })
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'restStat.services/getMenuList')
        }
    }

}

module.exports = new RestServ();