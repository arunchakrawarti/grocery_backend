const Order = require('../models/ordermodel')
const Product = require('../models/productmodel')

const placeOrderCOD = async(req,res)=>{
    try {
        const userId = req.user;
        const {items,address} = req.body;
        if(!items || !address) return res.status(400).json({message:'Items and address are required',success:false})
        let amount = await items.reduce(async(acc,item)=>{
         const product = await Product.findById(item.product);
         return (await acc) + product.offerPrice * item.quantity;
    },0);

    amount +=Math.floor((amount*2)/100);
    await Order.create({
        userId,
        items,
        address,
        amount,
        paymentType:"COD",
        isPaid:false
    })
    res.status(201).json({message:"Order placed successfully",success:true})
    } catch (error) {
        res.json({message:"error in placeOrderCOD",success:false,error:error.message})
    }
}

const getUserOrders = async(req,res)=>{
    try {
        const userId = req.user;
        const orders = await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:false}]
        }).populate("items.product address").sort({createdAt:-1});
        res.json({success:true,orders})
    } catch (error) {
       res.json({message:"error in getUserOrders",success:false,error:error.message}) 
    }
}

const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}],
        }).populate("items.product address")
        .sort({createdAt:-1});
        res.json({success:true,orders:orders});
    } catch (error) {
       res,json({message:'error in getallorders',success:false,error:error.message}) 
    }
}

module.exports = {
    placeOrderCOD,
    getUserOrders,
    getAllOrders
}