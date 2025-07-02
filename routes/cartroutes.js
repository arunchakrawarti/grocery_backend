const express = require('express');
const authUser = require('../middlewares/authUser');
const { updateCart } = require('../controllers/cardtcontroller');
const router = express.Router();

router.post('/update',authUser,updateCart)
// router.post('/api/cart/update',authUser,updateCart, (req, res) => {
//   console.log("🍪 Cookies:", req.cookies);
//   console.log("📦 Body:", req.body);
//   console.log("🧑‍💻 Headers:", req.headers);
//   console.log("userid:=",req.user)

//   res.status(200).json({ success: true, message: "Logged request data" });
// });


module.exports = router