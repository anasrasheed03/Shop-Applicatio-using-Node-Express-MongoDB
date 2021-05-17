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

//with sequelize method
// const {Sequelize} = require ('Sequelize');
// const sequelize = require('../util/database');

// const Product = sequelize.define('product',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull: false,
//         primaryKey:true
//     },
//     title:Sequelize.STRING,
//     price:{
//         type:Sequelize.DOUBLE,
//         allowNull:true,
//     },
//     imageUrl:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class Product {
    constructor(title,imageUrl,price,description,id,userId){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this._id = id;
        this.userId = userId;
    }

    save(){
        //sql way
    //  return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
    //   [this.title, this.price, this.imageUrl, this.description]
    //   );

    //mongodb way
        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db.collection('products').updateOne({_id:mongodb.ObjectID(this._id)},{$set:this})

        }else{
        dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    static fetchAll(){
    //mongod Db way
    const db = getDb();
       return db.collection('products').find().toArray()
        .then(
            products=>{
                console.log(products)
                return products;
            }
        )
        .catch(err=>{console.log(err)})
    //mysql way
    // return db.execute('select * from products')
    
    }

    static findById(id){
        console.log(id)
        const db = getDb();
       return db.collection('products').find({_id: mongodb.ObjectID(id)}).next()
        .then(
            product=>{
                console.log(product);
                return product;
            }
        )
        .catch(err=>{console.log(err)})
        //mysql way
    // return db.execute('Select * from products where products.id = ?',[id]);
    }

    static deleteById(id){
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectID(id)})
        .then(result =>{ 
            console.log('deleted')
        })
        .catch(err=>{console.log(err)})
    }
    
}

module.exports = Product;