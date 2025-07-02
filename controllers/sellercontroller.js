const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hellboy123'
// const jwt = require('jsonwebtoken')


const sellerLogin = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(
            email===process.env.SELLER_EMAIL && password===process.env.SELLER_PASSWORD
        ){
            const token = jwt.sign({email},JWT_SECRET,{expiresIn:"7d"})
            res.cookie("sellerToken",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:process.env.NODE_ENV==="production"?"none":"Strict",
                maxAge:7*24*60*60*1000,

            });
            res.json({message:"login successfully",success:true})
        }
    } catch (error) {
       res.json({message:"error in sellerLogin",success:false,error:error.message}) 
    }
}



const sellerLogout = async(req,res)=>{
    try{
        res.clearCookie("sellerToken",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"? "none":"Strict"
        });
        res.json({msg:"Logout successfully",success:true});
    }
    catch(error){
    res.json({msg:"error in sellerlogout",success:false,error:error.message})
    }
}

const isAuthSeller = async(req,res)=>{
    try {
        res.json({success:true})
    } catch (error) {
        res.json({msg:"error in isauthSeller",success:false,error:error.message})
    }
}



module.exports ={
    sellerLogin,
    sellerLogout,
    isAuthSeller
}