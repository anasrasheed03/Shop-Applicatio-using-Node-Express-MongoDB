const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path')
// const products = [];
const adminController = require('../controllers/admin')
//with controller
router.get('/add-product', adminController.getAddProduct)

//without Controller
// router.get('/add-product', (req, res, next) => {
//     // console.log("i'm the middleware")
//     // res.send('<form action="/admin/add-product" method="POST"><input name="title" type="text"/><button type="submit">Add Product</button></form>')
//     // res.sendFile(path.join(__dirname,'../','views','add-product.html'))
//     // res.sendFile(path.join(rootDir,'views','add-product.html'))
//     res.render('add-product', { 
//         docTitle: 'Add Products', 
//         path: '/admin/add-product',
//         activeProduct:true,
//         productCSS:true
//      })
// })

router.post('/add-product', adminController.postProduct)

router.get('/admin-product',adminController.getAdminProducts)


router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);
exports.routes = router;
// exports.products = products