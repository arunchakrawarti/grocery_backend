const Address = require('../models/addressmodel')


const addAddress = async(req,res)=>{
    try {
        const userId = req.user;
        const{address} = req.body;

        await Address.create({
            ...address,
            userId,
        })
        res.json({message:"Address added successfully",success:true});
    } catch (error) {
       res.json({message:"error in addaddress",success:false,error:error.message}) 
    }
}

const getAddress = async(req,res)=>{
    try {
        const userId = req.user;
        const addresses = await Address.find({userId}).sort({createdAt:-1})
        res.json({success:true,addresses})
    } catch (error) {
       res.json({message:"error in getAddress",success:false,error:error.message}) 
    }
}

module.exports ={
    addAddress,
    getAddress
}