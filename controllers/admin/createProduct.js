const ControllerError = require('../../errors/ControllerError');
const tokenVerif = require('../../helpers/tokenVerifikator');
const {adminCreate} = require('../../services');

module.exports = async (req, res, next) => {

    try {
        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {restaurant_id} = tokenVerif.auth(token);

        const form = req.body;


        const createProd = await adminCreate.createProduct(form, restaurant_id);


        res.json({
            success: true,
            msg:createProd
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/admin/createProduct'))
    }

}