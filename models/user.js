//sequelize method
// const Sequelize = require('Sequelize');
// const sequelize = require('../util/database');


//sequelze method
// const User = sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });

const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

// mongoDb method
class User  {
    constructor(username, email,cart,id){
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
}

    save(){
        const db = getDb();
       return db.collection('users').insertOne(this)
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    addToCart(product){
        const updatedCart = { items:[{productId:product._id,quantity:1}] };
        const db = getDb();
       return db.collection('users').updateOne({_id:new mongodb.ObjectID(this._id)},
        {
            $set:{cart:updatedCart}
        })
    }

    static findUserById(id){
        const db = getDb();
        return db.collection('users').findOne({_id: mongodb.ObjectID(id)})
        .then(result=>{
            console.log(result)
            return result
        })
        .catch(err=>{console.log(err)})
    }
} 

module.exports = User;