const JWT = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

function generateToken (user){
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    profileImage: user.profileImage

  }
  const token = JWT.sign(payload, secret, {expiresIn: '24h'});
  return token ; 
}
