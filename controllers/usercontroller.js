const Usercontroller = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'hellboy123'

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const existingUser = await Usercontroller.findOne({email})
    if(existingUser){
        res.json({message:"user already existe",success:false})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const user = await Usercontroller.create({
        name,
        email,
        password:hashedpassword
    })
    // const token = jwt.sign({id:user._id},JWT_SECRET)
    // res.cookie('token',token,{
    //     httpOnly:true,
    //     sameSite:'strict'
    // })
    res.json({message:"user register successfully",success:true,user})
    } catch (error) {
        res.json({message:"error in register user",success:false,error:error.message})
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const existingUser = await Usercontroller.findOne({email})
    if(existingUser){
     const comparePassword = await bcrypt.compare(password,existingUser.password);
     if(comparePassword){
        const token = jwt.sign({id:existingUser._id},JWT_SECRET)
        res.cookie('token',token,{
            secure:process.env.NODE_ENV === "production",
            // secure:false,
            sameSite:'strict',
            httpOnly:true,
            maxAge:3600000,
        })
        res.json({message:"user login successfully",success:true,user: {
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
  }})
     }
     else{
        res.json({message:"password is incorrect",success:false})
     }
    }
    else{
        res.json({message:"user not found",success:false})
    }

}





const logoutUser = async(req,res)=>{
   try {
     res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict"
    })
    res.json({message:"user logout successfully",success:true})
   } catch (error) {
    res.json({message:"error in logout user",success:false,error:error.message})
   }
}

const isAuthUser = async(req,res)=>{
    try {
        const userId = req.user;
        if(!userId){
            return res.json({message:"Unauthorized",success:false})
        }
        const user = await Usercontroller.findById(userId).select("-password")
        res.json({success:true,user})
    } catch (error) {
        res.json({message:"error in isAuthUser",success:false,error:error.message})
    }
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    isAuthUser
}