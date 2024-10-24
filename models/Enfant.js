const mongoose = require('mongoose');

const enfantSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, required: true, ref: 'Parent' },
  chauffeur: { type: mongoose.Types.ObjectId, required: true, ref: 'Chauffeur' },
  abonnement: { type: mongoose.Types.ObjectId, required: true, ref: 'Abonnement' },
  ecole: { type: mongoose.Types.ObjectId, required: true, ref: 'Ecole' }
});

module.exports = mongoose.models.Enfant || mongoose.model('Enfant', enfantSchema);
