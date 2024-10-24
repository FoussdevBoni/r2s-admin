const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  userId: { type: String, required: true },
  role: { type: String, required: true , default:'admin'}

});

module.exports = mongoose.model('Admin', adminSchema);
