const path=require('path');
const express = require("express");
const bodyParser=require('body-parser');

const mongoose = require("mongoose");
const User = require("./models/user");

const shopRoutes=require('./routes/shop');
const adminRoutes=require('./routes/admin');

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findById('64c65b113fb15f8a37b77b99')
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
