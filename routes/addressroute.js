const express = require('express')
const authUser = require('../middlewares/authUser')
const { addAddress, getAddress } = require('../controllers/addresscontroller')
const router = express.Router()

router.post('/add',authUser,addAddress);
router.get('/get',authUser,getAddress)

module.exports = router