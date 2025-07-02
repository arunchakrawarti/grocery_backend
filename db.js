const mongoose = require('mongoose')

const connectDB = async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('mongodb connected successfully'))
    .catch(()=>console.log('error in connecting mongoose'))
}

module.exports = connectDB;