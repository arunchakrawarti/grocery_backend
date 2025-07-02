const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: 'https://grocery-dun.vercel.app/',
  credentials: true
}));


app.use(cookieParser());

// Routes

const userrouter = require('./routes/userroute');
const sellerroute = require('./routes/sellerroute');
const productRoutes = require('./routes/productroute')
const cartRoutes = require('./routes/cartroutes')
const orderRoutes = require('./routes/orderroute')
const addressRoutes = require('./routes/addressroute')

// DB and Cloudinary connection
const connectDB = require('./db');
const connectcloudinary = require('./cloudinaryuser');
const authUser = require('./middlewares/authUser');



connectDB();
connectcloudinary

app.use('/images',express.static('uploads'))
app.use('/api/user', userrouter);
app.use('/api/seller', sellerroute);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/order',orderRoutes)
app.use('/api/address',addressRoutes)

// In your backend route:
app.get('/api/user/is-auth', (req, res) => {
  // console.log(req.cookies); // ✅ See if token is coming in
});
app.get('/api/seller/is-auth', (req, res) => {
  // console.log(req.cookies); // ✅ See if token is coming in
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
