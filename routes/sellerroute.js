const express = require('express');
const { sellerLogin, sellerLogout, isAuthSeller } = require('../controllers/sellercontroller');
const authSeller = require('../middlewares/authSeller');
const router = express.Router()


router.post('/login',sellerLogin)
router.get('/is-auth',authSeller,isAuthSeller)
router.post('/logout',authSeller,sellerLogout)

// router.get('/api/seller/is-auth', (req, res) => {
//   console.log(req.cookies); // ✅ See if token is coming in
// });


module.exports = router;