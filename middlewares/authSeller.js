const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hellboy123'

const authSeller = async(req,res,next)=>{
   try {
     const {sellerToken} = req.cookies;
    if(!sellerToken){
        return res.status(401).json({message:"unauthorization",success:false});
    }
    const decoded = jwt.verify(sellerToken,JWT_SECRET);
    if(decoded.email===process.env.SELLER_EMAIL){
      next();
    }
   
   } catch (error) {
    res.json({message:"unauthorization",success:false})
   }
}

module.exports = authSeller