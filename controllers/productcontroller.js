const Product = require('../models/productmodel')

const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;
    const image = req.files?.map(file => file.filename);
  
    if (!name || !description || !price || !offerPrice || !category || !image || image.length === 0) {
      return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    await Product.create({
      name,
      description,
      price,
      offerPrice,
      category,
      image
    });

    res.json({ message: "Product added successfully", success: true });
  } catch (error) {
    res.json({ message: "Error in addProduct", success: false, error: error.message });
  }
};

const getProducts = async(req,res)=>{
    try {
        const products = await Product.find().sort({createdAt:-1});
        res.json({products,success:true})
    } catch (error) {
        res.json({msg:"error in getProduct",success:false,error:error.message})
    }
}

const getProductById = async(req,res)=>{
    try {
        const {id} = req.body;
        const product = await Product.findById(id);
        if(!product){
            return res.json({msg:"Product not found",success:false})
        }
        res.json({product,success:true})
    } catch (error) {
        res.json({msg:"error in getProductbyid",success:false,error:error.message})
    }
}

const changeStock = async(req,res)=>{
    try {
        const {id,inStock} = req.body;
        const product = await Product.findByIdAndUpdate(id,{inStock},{new:true})
        if(!product){
            return res.json({msg:"Product not found",success:false})
        }
        res.json({message:"stock updated successfully",product,success:true});
    } catch (error) {
      res.json({msg:"error in change stock",success:false,error:error.message})  
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    changeStock,

}