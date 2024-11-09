const mongoose = require('mongoose');

const enfantSchema = new mongoose.Schema({
 
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  grade: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
    trim: true,
  },
  pickUpPoint: {
    type: Object,
    required: true,
  },
  dropOffPoint: {
    type: Object,
    required: true,
  },
  personInCharge: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String, 
  },
  isMobilityReduced: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  tutoring: {
    type: Boolean,
    default: false,
  },
  extraSchoolDays: {
    type: Boolean,
    default: false,
  },
  tutoringStartDate: {
    type: String,
    required: false
  },
  tutoringEndTime: {
    type: String, // Format: "HH:MM"
    required: false, 
  },
  extraDaysStartDate: {
    type: String,
    required: false,
  },
  extraDaysArrivalTime: {
    type: String, // Format: "HH:MM"
    required: false
  },
  parent: { type: mongoose.Types.ObjectId, required: false, ref: 'Parent' },
  chauffeur: { type: mongoose.Types.ObjectId, required: false, ref: 'Chauffeur' },
  abonnement: { type: [mongoose.Types.ObjectId ], required: false, ref: 'Abonnement' },
  school: { type: mongoose.Types.ObjectId, required: true, ref: 'Ecole' }
}, { timestamps: true });

const Enfant = mongoose.model('Enfant', enfantSchema);

module.exports = Enfant;
