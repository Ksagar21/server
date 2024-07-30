const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isverified: { type: Boolean, required: true,default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
