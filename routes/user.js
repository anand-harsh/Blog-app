const express = require('express');
const router = express.Router();

router.get('/sign-in', (req, res)=>{
  res.render('./SignIn');
})

router.get('/sign-up', (req, res)=>{
  res.render('./SignUp'); 
})

module.exports = router;
