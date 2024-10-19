const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/sign-in', (req, res)=>{
  res.render('./SignIn');
})

router.get('/sign-up', (req, res)=>{
  res.render('./SignUp');
})

router.post('/sign-up' , async (req, res)=>{
  const {fullName, password, email} = req.body;
  await User.create({
    fullName,
    password,
    email
  });
  res.redirect('/');

})

module.exports = router;
