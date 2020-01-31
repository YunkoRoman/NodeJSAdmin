const router = require('express').Router();

const {authController} = require('../controllers/Auth');

router.post('/', authController);

module.exports = router