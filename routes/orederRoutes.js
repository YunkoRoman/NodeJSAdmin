const router = require('express').Router();

const {changeOrderStatus, getOrderStatus, getComplOrders} = require('../controllers/Order');

router.get('/getStatus/:id', getOrderStatus);
router.post('/changeStatus', changeOrderStatus);
router.get('/complOrders/:id', getComplOrders);


module.exports = router;