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

function validateToken (token){
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  generateToken,
  validateToken
}
