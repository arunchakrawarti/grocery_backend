const express = require('express');
const { registerUser, loginUser, logoutUser, isAuthUser } = require('../controllers/usercontroller');
const authUser = require('../middlewares/authUser');
const router = express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',authUser,logoutUser)
// router.get('/is-auth',authUser,isAuthUser)

router.get('/api/user/is-auth', (req, res) => {
//   console.log(req.cookies); // ✅ See if token is coming in
});


module.exports = router;