const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { redirect } = require('react-router-dom');

router.get('/sign-in', (req, res)=>{
  res.render('SignIn', {error: null});
})

router.post('/sign-in', async (req, res)=>{
  const {email, password} = req.body;
  try{
  const token = await User.matchPasswordAndGenerateToken(email, password);
  // console.log(token);
  res.cookie("token", token).redirect('/');
  }
  catch(error){
    res.render('SignIn', {
      error: 'Wrong email or password!'
    })
  }

})

router.get('/sign-up', (req, res)=>{
  res.render('./SignUp');
})

router.post('/sign-up' , async (req, res)=>{
  const {fullName, password, email, profileImage} = req.body;
  await User.create({
    fullName,
    password,
    email,
    profileImage
  });
  res.redirect('/');

})

module.exports = router;
