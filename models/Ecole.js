const mongoose = require('mongoose');

const EcoleSchema = new mongoose.Schema({
    role: {
    type: String,
    default: 'ecole',
  },
  nomEcole: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  codePostal: {
    type: String,
    required: true,
  },
  telephoneEcole: {
    type: String,
    required: true,
  },
  emailEcole: {
    type: String,
    required: true,
  },
  nomResponsable: {
    type: String,
    required: true,
  },
  fonctionResponsable: {
    type: String,
    required: true,
  },
  telephoneResponsable: {
    type: String,
    required: true,
  },
  emailResponsable: {
    type: String,
    required: true,
  },
 
  
  nbElevesTransport: {
    type: Number,
    required: true,
  },
  horairesDebut: {
    type: String,
    required: true,
  },
  horairesSortie: {
    type: String,
    required: true,
  },
  horairesMercredi: {
    type: String,
    required: true,
  },
  transportDays: {
    lundi: { type: Boolean, default: false },
    mardi: { type: Boolean, default: false },
    mercredi: { type: Boolean, default: false },
    jeudi: { type: Boolean, default: false },
    vendredi: { type: Boolean, default: false },
  },
  repetitions: {
    lundi: { type: Boolean, default: false },
    mardi: { type: Boolean, default: false },
    mercredi: { type: Boolean, default: false },
    jeudi: { type: Boolean, default: false },
    vendredi: { type: Boolean, default: false },
  },
  specificNeeds: {
    type: String,
  },
  classesOuvertes: {
    maternelle: { type: Boolean, default: false },
    primaire: { type: Boolean, default: false },
    secondaire1: { type: Boolean, default: false },
    secondaire2: { type: Boolean, default: false },
    examens: { type: Boolean, default: false },
  },
  termsAccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  commentaires: {
    type: String,
  },
  logo: {
    type: String,
  },
  statut: {
    type: String,
    enum: ['actif', 'inactif'],
    default: 'actif',
  },
  performance: {
    type: Number,
    default: 1,
  },
  
  // Liens vers d'autres modèles (bus et enfants)
  enfants: [{ type:[ mongoose.Types.ObjectId], ref: 'Enfant', required: false }],
  bus: [{ type: [mongoose.Types.ObjectId], ref: 'Bus', required: false }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Ecole', EcoleSchema);
