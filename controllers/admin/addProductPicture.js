const ControllerError = require('../../errors/ControllerError');
const tokenVerif = require('../../helpers/tokenVerifikator');
const {adminCreate} = require('../../services');

module.exports = async (req, res, next) => {

    try {
        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {restaurant_id} = tokenVerif.auth(token);
        const {id} = req.params;
        const {picture} = req.files;

        const addPicture = await adminCreate.addPicture(picture, restaurant_id, id);

        res.json({
            success: true,
            msg: addPicture
        });


    } catch (e) {
        next(new ControllerError(e.message, e.status, 'controllers/admin/addProductPicture'))
    }

}