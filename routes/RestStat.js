const router = require('express').Router();

const {prodStat, menuList} = require('../controllers/restaurantStat');

router.post('/', prodStat);
router.get('/menu/:id', menuList);

module.exports = router;