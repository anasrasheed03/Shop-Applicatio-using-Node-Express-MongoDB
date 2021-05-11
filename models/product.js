// //without file system
// const products = []

// // //withFile Systems
// // const fs = require('fs');
// const rootDir = require('../util/path');
// const path = require('path')
// // const filePath = path.join(rootDir,'Data','products.json');
// const db = require('../util/database');
// module.exports = class Product {
//     constructor(id,title,imageUrl,price,description){
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//     }

//     save(){
//      return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
//       [this.title, this.price, this.imageUrl, this.description]
//       );
//     }

//     static fetchAll(){
//     return db.execute('select * from products')
    
//     }

//     static findById(id){
//     return db.execute('Select * from products where products.id = ?',[id]);
//     }

//     static deleteById(id){

//     }
    
// }

const {Sequelize} = require ('Sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    title:Sequelize.STRING,
    price:{
        type:Sequelize.DOUBLE,
        allowNull:true,
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Product;