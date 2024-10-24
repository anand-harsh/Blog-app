const {Schema, model} = require('mongoose');
const {createHmac, randomBytes} = require("crypto");
const { generateToken } = require('../services/authentication');

const userSchema = Schema({
  fullName: {
    type:String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required:true,
  },
  profileImage:{
    type: String,
    default: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
  },
  role:{
    type:String,
    enum:["USER", "ADMIN"],
    default: "USER"
  },
  salt:{
    type:String,

  }

}, {timestamps:true});


userSchema.pre("save", function(next){
  const user = this;

  if(!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
})

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
  const user = await this.findOne({email});
  if(!user) throw new Error("User doesn't exist");

  const salt = user.salt;
  const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
  if(user.password!==hashedPassword){
    throw new Error("Wrong password");
  }
  const token = generateToken(user);
  return token;
})




const User = model("User", userSchema);
module.exports = User;

