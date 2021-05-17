const Product = require('../models/product')
const mongoDb = require('mongodb');

const ObjectID = mongoDb.ObjectID;
exports.getAddProduct = (req, res, next) => {
    // console.log("i'm the middleware")
    // res.send('<form action="/admin/add-product" method="POST"><input name="title" type="text"/><button type="submit">Add Product</button></form>')
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'))
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('admin/add-product', { 
        docTitle: 'Add Products', 
        path: '/admin/add-product',
        activeProduct:true,
        productCSS:true,
        editing: false
     })
}

exports.postProduct =(req, res, next) => {
    //without moodel
    // products.push({ title: req.body.title })
    //with model
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    // const product = new Product(null,title,imageUrl,price,description)
    // product.save().then(()=>{
    //     res.redirect('/')
    // }).catch();
    // Product.create({
    //     title:title,
    //     price:price,
    //     imageUrl:imageUrl,
    //     description:description
    // })
    //sequelize way
    // req.user.createProduct(
    //     {
    //             title:title,
    //             price:price,
    //             imageUrl:imageUrl,
    //             description:description
    //         }  
    // )
    //mongodb way
    const product = new Product(title,imageUrl,price,description,null,req.user._id);
    product.save()
    .then((result)=>{
        console.log(result)
        res.redirect('/admin/admin-product')
    }).catch(err=>{console.log(err)});
    
}

exports.getAdminProducts=(req,res,next)=>{
    // Product.fetchAll(products=>{
    //     res.render('admin/products',{
    //         prods: products, 
    //         docTitle:'Admin Products',
    //         path:'/admin/admin-products'
    
    //     })
    // });

    //sequelize way
    // req.user.getProducts().then(products=>{
    // Product.findAll().then((products=>{
    //     res.render('admin/products',{
    //         prods: products, 
    //         docTitle:'Admin Products',
    //         path:'/admin/admin-products'
    
    //     })
    // });

    //mongo way
    Product.fetchAll()
    .then((products=>{
        res.render('admin/products',{
            prods: products, 
            docTitle:'Admin Products',
            path:'/admin/admin-products'
    
        })
    }));

   
      
   
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    console.log(prodId)
    //mongodb way
    Product.findById(prodId)
    .then(
        product=>{
            console.log('runs')
            console.log(product)
            res.render('admin/edit-product', {
                    docTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product
                  });
        }
    )
    .catch(err=>{console.log(err)})

    //sequelize way
    // Product.findByPk(prodId, product => {
    //   if (!product) {
    //     return res.redirect('/');
    //   }
    //   res.render('admin/edit-product', {
    //     pageTitle: 'Edit Product',
    //     path: '/admin/edit-product',
    //     editing: editMode,
    //     product: product
    //   });
    // });
    // req.user.getProducts({where:{id:prodId}})
    // Product.findByPk(prodId)
    // .then(
    //     (product)=>{
    //         res.render('admin/edit-product', {
    //             docTitle: 'Edit Product',
    //                 path: '/admin/edit-product',
    //                 editing: editMode,
    //                 product: product
    //               });
    //     }
    // ).catch(err=>console.log(err));
  };
  
  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    console.log('prodId',prodId)

    const prd = new Product(updatedTitle,updatedImageUrl,updatedPrice,updatedDesc,new ObjectID(prodId))
    prd.save()
    .then(result=>{
    res.redirect('/admin/admin-product');
    })
    //sequelize way
    // Product.findByPk(prodId).then(
    //     product=>{
    //         product.title= updatedTitle;
    //         product.price = updatedPrice;
    //         product.imageUrl = updatedImageUrl;
    //         product.description = updatedDesc;
    //         return product.save();
    //     }
    // )
    // .then(result=>{
    // res.redirect('/admin/admin-product');

    //     console.log('Updated Porduct')
    // })
    // .catch(err=>console.log(err))
    // const updatedProduct = new Product(
    //   prodId,
    //   updatedTitle,
    //   updatedImageUrl,
    //   updatedDesc,
    //   updatedPrice
    // );
    // updatedProduct.save();
  };


exports.postDeleteProduct = (req, res, next) => {
    console.log('reqid',req.body.productId);
    const prodId = req.body.productId;
    // Product.deleteById(prodId);
    //sequelize way
    // Product.findByPk(prodId).then(
    //     product=>{
    //         product.destroy();
    //     }
    // )
    // .then(
    //     result=>{
    //         console.log('deleted')
    // res.redirect('/admin/admin-product');
            
    //     }
    // )
    // .catch(err=>console.log(err));

    //mongdb methond
    Product.deleteById(prodId)
    .then(
        result=>{
            console.log('deleted')
    res.redirect('/admin/admin-product');
            
        }
    )
    .catch(err=>console.log(err));
  };
