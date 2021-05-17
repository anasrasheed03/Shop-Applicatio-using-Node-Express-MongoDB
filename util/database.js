// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'learning-node',
//     password:'P@ssw0rd'
// });

// module.exports = pool.promise();

//mysql + sequelize work
// const Sequelize = require('sequelize');
// const {Sequelize} = require("sequelize");

// const sequelize = new Sequelize('learning-node','root','P@ssw0rd',{host:'localhost',dialect:'mysql'})

// module.exports  = sequelize;

//for mongodb
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
/** @type {mongodb.Db} */
let _db;
const mongoConnect = (callback)=>{
    MongoClient.connect('mongodb+srv://ZCGawUWxCKWeS23k:GRVjFN5A60mzVHYo@cluster0.6a3sf.mongodb.net/shop?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(client=>{
    console.log('Connected')
    _db = client.db();
    callback();
})
.catch(err=>{console.log(err)
    throw err;
});
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw 'No Database Found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;