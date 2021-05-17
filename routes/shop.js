const express = require('express');
const path = require('path');
const router = express.Router();
const shopController = require('../controllers/shop')
//without controller
// const rootDir = require('../util/path')
// const adminData = require('./admin')
//without controller
// router.get('/', (req, res, next) => {
//     // console.log("I'm another middleware")
//     // res.send('<h1>Hello from Express JS</h1>')
//     // res.sendFile(path.join(__dirname,'../','views','shop.html'))
//     // console.log(adminData.products)
//     // res.sendFile(path.join(rootDir,'views','shop.html'))
//     //pug implementation
//     const products = adminData.products;
//     res.render('shop', { 
//         prods: products, 
//         docTitle: 'Shop', 
//         path: '/', 
//         hasProducts: products.length > 0,
//         activeShop: true,
//         productCSS:true })
// })

//with controller
router.get('/',shopController.getIndex)
// router.get('/cart',shopController.getCart)
router.post('/cart', shopController.postCart)
// router.get('/orders',shopController.getOrders)
// router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.get('/products',shopController.getProducts)
router.get('/products/:productId',shopController.getProductById)
// router.get('/checkout',shopController.getCheckout)
module.exports = router;