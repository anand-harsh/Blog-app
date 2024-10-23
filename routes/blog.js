const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.resolve('./public/uploads/'));
  },
  filename: function(req, file, cb){
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
})

const uploads = multer.uploads({storage: storage});


router.get('/add-blog', (req, res)=>{
  return res.render('AddBlog', {
    user: req.user
  });
});

router.post('/add-blog', uploads.single('coverImage'), async(req, res)=>{
  const {title, body} = req.body;
  const coverImage = req.file.filename;
  const blog = await Blog.create({
    title,
    body,
    createdBy : req.user._id,
    coverImage: `uploads/${coverImage}`
  })
  res.redirect('/');

})

module.exports = router;
