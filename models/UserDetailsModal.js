const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  phoneNo:{ type: String, required: true},
});

const UserDetails = mongoose.model('UserDetails', userSchema);

module.exports = UserDetails;
