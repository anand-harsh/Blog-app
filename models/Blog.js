const {Schema, model} = require('mongoose');

const BlogSchema = Schema({
  title:{
    type:String,
    required: true
  },
  body:{
    type:String,
    required: true
  },
  coverImage:{
    type:String,
    required:true,
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
}, {timestamps:true});

const Blog = model("Blog", BlogSchema);

module.exports = Blog;
