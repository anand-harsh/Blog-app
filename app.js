require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user');
const { checkForAuthenticationCookie } = require('./middleware/authentication');

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongo DB connected")).catch(error=>console.log(error));

const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views') );

app.use('/user', userRoute);

app.get('/', (req, res)=>{
  res.render('Home',{
    user: req.user
  });
})

app.listen(PORT, ()=>{console.log(`Server started on the port:${PORT}`)});
