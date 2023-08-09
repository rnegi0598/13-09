const path=require('path');
const express = require("express");
const bodyParser=require('body-parser');
const mongoose = require("mongoose");
// model
const User = require("./models/user");
// routes
const shopRoutes=require('./routes/shop');
const adminRoutes=require('./routes/admin');

const app = express();
// setting views and view engine
app.set('view engine','ejs');
app.set('views','./views');  //this is optional and only required when you want to name your view folder some other name

// middlewares
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findById('64d33e6a1d1a8724db458e9c')
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>{
            console.log(err);
        })
})



app.use('/admin',adminRoutes);
app.use(shopRoutes);

// db connections
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "shop",
  })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "max",
          email: "max@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
