const mongoose = require('mongoose');

const flotteSchema = new mongoose.Schema({
      role: {
    type: String,
    default: 'flotte',
  },
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  userId: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rccmNumber: { type: String, required: true },
  niuNumber: { type: String, required: true },
  creationDate: { type: String, required: true },
  managerName: { type: String, required: true },
  function: { type: String, required: true },
  cniNumber: { type: String, required: true },
  cniValidity: { type: String, required: true },
  managerPhone: { type: String, required: false },
  managerEmail: { type: String, required: false },
  managerPhoto: { type: String, required: false },
  cniFrontImage: { type: String, required: false },
  cniBackImage: { type: String, required: false },
  numberOfVehicles: { type: Number, required: true },
  vehicleTypes: { type: [String], required: false },
  vehicleCertifications: { type: Boolean, required: true },
  vehicleInsurances: { type: Boolean, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
  consentAccepted: { type: Boolean, required: true },
   chauffeurs: [{ type: mongoose.Types.ObjectId, ref: 'Chauffeur', required: false }],
  cni: { type: String, required: false },
  performance: { type: Number, required: false },
  statut: { type: String, required: false },
    logo: { type: String },
  vehicles: [{ type: mongoose.Types.ObjectId, ref: 'Voiture', required: false }]
});

module.exports = mongoose.model('Flotte', flotteSchema);
