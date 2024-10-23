const express = require('express');
const router = express.Router();

router.get('/add-blog', (req, res)=>{
  res.render('AddBlog');
})

module.exports = router; 
