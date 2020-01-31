const router = require('express').Router();

const {changeOrderStatus, getOrderStatus} = require('../controllers/Order');

router.get('/getStatus/:id', getOrderStatus);
router.post('/changeStatus', changeOrderStatus);


module.exports = router;