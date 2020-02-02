const dataBase = require('../dataBase').getInstance();
const ControllerError = require('../errors/ControllerError');

class checkService {

    checkAdmin(login, password) {

        const AdminModel = dataBase.getModel('admin');
        try {
            if (!login && !password) throw new Error('No login or password');
            return AdminModel.findOne({
                attributes:{
                  exclude:['login', 'password']
                },
                where: {
                    login,
                    password
                }
            })


        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'checkAdmin.service/checkAdmin')
        }

    }

}

module.exports = new checkService();