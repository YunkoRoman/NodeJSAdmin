const {tokinayzer} = require('../../helpers');
const ControllerError = require('../../errors/ControllerError');
const {authService, checkAdmin} = require('../../services');


module.exports = async (req, res, next) => {
    try {
        const {login, password} = req.body;
        console.log(login);
        if (!login && !password) throw new Error('No login or password');

        const AdminIsRegistr = await checkAdmin.checkAdmin(login, password);
        if (!AdminIsRegistr) throw new Error('You are not register');

        // const {id, name, surname} = UserIsRegistr;
        // const token = tokinayzer.auth({id, name, surname});

        res.json({
            success: true,
            msg: AdminIsRegistr
        })


    } catch (e) {
        next(new ControllerError(e.message, e.status, 'authUser'))
    }
}