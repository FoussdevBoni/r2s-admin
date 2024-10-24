const mongoose = require('mongoose');

const voitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  immatriculation: { type: String, required: true },
  location: {
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    required: true
  },
  enfants: [{ type: mongoose.Types.ObjectId, ref: 'Enfant', required: true }],
  cni: { type: String, required: true }
});

module.exports = mongoose.model('Voiture', voitureSchema);
