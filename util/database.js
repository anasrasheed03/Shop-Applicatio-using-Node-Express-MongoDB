// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'learning-node',
//     password:'P@ssw0rd'
// });

// module.exports = pool.promise();

// const Sequelize = require('sequelize');
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('learning-node','root','P@ssw0rd',{host:'localhost',dialect:'mysql'})

module.exports  = sequelize;