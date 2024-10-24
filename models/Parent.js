const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  enfants: [{ type: mongoose.Types.ObjectId, ref: 'Enfant', required: true }],
  cni: { type: String, required: true }
});

module.exports = mongoose.model('Parent', parentSchema);
