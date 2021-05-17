const Product = require('../models/product')
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
        // const products = adminData.products;
        //with models
        // Product.fetchAll(products=>{
        //     res.render('shop/product-list', { 
        //         prods: products, 
        //         docTitle: 'Products', 
        //         path: '/products', 
        //         hasProducts: products.length > 0,
        //         activeShop: true,
        //         productCSS:true })
        // });

        // Product.fetchAll()
        // .then(([rows,fieldData])=>{
        //     res.render('shop/product-list', { 
        //                 prods: rows, 
        //                 docTitle: 'Products', 
        //                 path: '/products', 
        //                 hasProducts: rows.length > 0,
        //                 activeShop: true,
        //                 productCSS:true })
        // })
        // .catch()
        // Product.findAll()
        Product.fetchAll()
        .then(products =>{
            res.render('shop/product-list', { 
                                prods: products, 
                                docTitle: 'Products', 
                                path: '/products', 
                                hasProducts: products.length > 0,
                                activeShop: true,
                                productCSS:true })
        })
        .catch(
            err=>{
                console.log(err)
            }
        )
      
    }

exports.getProductById = (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then((product)=>{
        res.render('shop/product-detail',
        {product:product,
         docTitle:product.title+' Detail',
         path:'/products'})

    })
    .catch((err)=>{console.log(err)});
    // Product.getProductById(prodId,product=>{
    //     res.render('shop/product-detail',{product:product, docTitle:product.title+' Detail',path:'/products'})
    // })
}

// exports.getCart = (req, res, next) => {
//     req.user.getCart().then(
//       cart =>{
//         return cart.getProducts().then(
//           products=>{
//             res.render('shop/cart', {
//                     path: '/cart',
//                     docTitle: 'Your Cart',
//                     products: products
//                   });
//           }
//         ).catch(err=>console.log(err))
//       }
//     ).catch(err=>{console.log(err)})
//     // Cart.getCart(cart => {
//     //   Product.fetchAll(products => {
//     //     const cartProducts = [];
//     //     for (product of products) {
//     //       const cartProductData = cart.products.find(
//     //         prod => prod.id === product.id
//     //       );
//     //       if (cartProductData) {
//     //         cartProducts.push({ productData: product, qty: cartProductData.qty });
//     //       }
//     //     }
//     //     res.render('shop/cart', {
//     //       path: '/cart',
//     //       pageTitle: 'Your Cart',
//     //       products: cartProducts
//     //     });
//     //   });
//     // });
//   };

exports.postCart = (req,res,next)=>{
    const prodId = req.body.productId
    //mongodb method
    Product.findById(prodId)
    .then(product=>{
        return req.user.addToCart(product)
    })
    .then(result=>{
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })

    //sequelize method
    // let fetchedCart;
    // let newQuantity= 1;

    // // Product.getProductById(prodId,product =>{
    // //     Cart.addProduct(prodId,product.price)
    // // })
    // // res.redirect('/cart')
    // req.user.getCart()
    // .then(cart =>{
    //     fetchedCart = cart;
    //     return cart.getProducts({where:{id:prodId}});
    // })
    // .then(products=>{
    //     let product;
    //     if(products.length>0){
    //         product = products[0];
    //     }
    //     if(product){
    //         const oldQuantity = product.cartItem.quantity
    //         // console.log(oldQuantity)
    //         newQuantity = oldQuantity+1;
    //         // console.log(product)
    //         return product;
    //     }
    //     return Product.findByPk(prodId);
    //     })
    //     .then(product=>{
    //         return fetchedCart.addProduct(product,{ through:{ quantity:newQuantity}})
    //     })
    //     .then(resp =>{
    //         res.redirect('/cart')

    //     })
    //     .catch(err=>{console.log(err)})
    // // })
    // .catch(err=>{console.log(err)})
}

// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user.getCart().then(
//         cart=>{
//             return cart.getProducts({where:{id:prodId}})
//         })
//         .then(products=>{
//             const product = products[0]
//             product.cartItem.destroy();
//         })
//         .then(resp=>{
//             res.redirect('/cart')

//         })
//         .catch(err=>{console.log(err)})
//   };

// exports.getOrders = (req,res,next)=>{
//     res.render('shop/orders',{
//         docTitle:'Your Orders',
//         path:'/orders',

//     })

// }

exports.getIndex=(req,res,next)=>{
    // Product.fetchAll()
    // .then(([rows,fieldData])=>{
    //     res.render('shop/index',{
    //         prods: rows, 
    //         docTitle:'Index',
    //         path:'/'
    //     })
    // })
    // .catch()
    // Product.findAll()
    Product.fetchAll()
    .then(prdoucts =>{
        res.render('shop/index',{
                    prods: prdoucts, 
                    docTitle:'Index',
                    path:'/'
                })
    })
    .catch(
        err=>{
            console.log(err)
        }
    )
   

}

exports.getCheckout= (req,res,next)=>{
    res.render('shop/checkout',{
        docTitle:'Checkout',
        path:'/checkout'
    })
}

