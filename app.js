require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const blogRouter = require('./routes/blog');
const userRoute = require('./routes/user');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const Blog = require('./models/Blog')
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));


mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongo DB connected")).catch(error=>console.log(error));

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views') );

app.use('/user', userRoute);
app.use('/blog', blogRouter);

app.get('/', async (req, res)=>{
  const allBlogs = await Blog.find({}).populate('createdBy');
  res.render('Home',{
    user: req.user,
    blogs: allBlogs
  });
})

app.listen(PORT, ()=>{console.log(`Server started on the port:${PORT}`)});

module.exports = app
