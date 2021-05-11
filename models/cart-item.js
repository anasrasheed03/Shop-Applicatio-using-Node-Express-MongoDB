// const { fstat } = require('fs');
// const path = require('path');
// const fs = require('fs');
// const rootDir = require('../util/path');
// const filePath = path.join(rootDir,'Data','cart.json')

// module.exports = class Cart {

//     static addProduct(id,price){
//         console.log(price)
//         fs.readFile(filePath, (err,fileContent)=>{
//             let cart = {product:[],totalPrice:0}
//             if(!err){
//                 cart = JSON.parse(fileContent);
//             }
//             const exitingProductIndex = cart.product.findIndex(prod => prod.id === id);
//             const exitingProduct = cart.product[exitingProductIndex];
//             let updateProduct;
//             if(exitingProduct){
//                 updateProduct = {...exitingProduct};
//                 updateProduct.qty = updateProduct.qty + 1;
//                 cart.product = [...cart.product]
//                 cart.product[exitingProductIndex]= updateProduct;

//             }else{
//                 updateProduct = {id:id, qty:1}
//                 cart.product = [...cart.product,updateProduct]

//             }
//             cart.totalPrice = cart.totalPrice + +price;
//             fs.writeFile(filePath,JSON.stringify(cart),err=>{
//                 console.log(err);   
//             })
//         })
//     }
// }

const {Sequelize} = require ('Sequelize');

const sequelize = require('../util/database')

const CartItem = sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:Sequelize.INTEGER
})

module.exports = CartItem;