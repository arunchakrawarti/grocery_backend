const express = require('express')
const authUser = require('../middlewares/authUser')
const { placeOrderCOD, getUserOrders, getAllOrders } = require('../controllers/ordercontroller');
const authSeller = require('../middlewares/authSeller');
const router = express.Router()

router.post('/cod',authUser,placeOrderCOD);
router.get('/user',authUser,getUserOrders);
router.get('/seller',authSeller,getAllOrders)

module.exports = router