const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/sign-in', (req, res)=>{
  res.render('./SignIn');
})

router.post('/sign-in', async (req, res)=>{
  const {email, password} = req.body;
  const user = await User.matchPassword(email, password);
  if(user)res.redirect('/');

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
