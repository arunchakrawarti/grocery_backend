const express = require('express');
const upload = require('../multer');
const authSeller = require('../middlewares/authSeller');
const { addProduct, getProducts, getProductById, changeStock } = require('../controllers/productcontroller');

const router = express.Router();

router.post('/add-product', authSeller, upload.array("image", 4), addProduct); // 👈 'image' field name match hona chahiye
router.get('/list', getProducts);
router.get('/id', getProductById);
router.post('/stock', authSeller, changeStock);

module.exports = router;
