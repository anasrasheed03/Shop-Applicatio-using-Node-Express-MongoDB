// const http = require('http');

// const routes = require('./routes')
// console.log(routes.someText)
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const sequelize = require('./util/database');
// const db = require('./util/database');

const errorController = require('./controllers/error')
//ejs template engine implementation
app.set('view engine','ejs');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

//handlebars template engine implementation
// const expressHbs = require('express-handlebars')
// app.engine('hbs',expressHbs({layoutsDir:'views/layouts',defaultLayout:'main-layout',extname:'hbs'}));
// app.set('view engine','hbs')
//pug template engine implementation
// app.set('view engine','pug')
const rootDir = require('./util/path')

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('select * from products')
// .then((res)=>{
//     console.log(res)
// })
// .catch(err =>{
//     console.log(err)
// });

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>{console.log(err)})
});

app.use('/admin',adminData.routes)

app.use(shopRoutes);

//with controller
app.use(errorController.error404)
//without controller
// app.use((req,res,next)=>{
//     // res.status(404).send('<h1>Page Not Found</h1>')
//     // res.status(404).sendFile(path.join(__dirname,'views','404.html'))
//     // res.status(404).sendFile(path.join(rootDir,'views','404.html'))
//     res.status(404).render('404',{docTitle:'404 Not Found'})

// })
//node way without express
// const server = http.createServer(app);
// server.listen(3000);

//node way with express

Product.belongsTo(User,{contrain:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
sequelize.sync()
.then((res)=>{
    return User.findByPk(1)
})
.then(user=>{
    if(!user){
        User.create({name:'Anas', email:'anas.rasheed@email.com'})
    }
    return user
})
// .then(result=>{
//     // console.log(result)
//     // return result.createCart();
// })
.then(
    res =>{
    app.listen(3000);

    }
)
.catch(err=>{
    console.log(err)
});