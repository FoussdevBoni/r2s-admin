const mongoose = require('mongoose');

const voitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  immatriculation: { type: String, required: true },
  location: {type: Object, required: true},
  enfants: {type: [mongoose.Types.ObjectId] , required: true , ref:'Enfant'},
  cni:  {type: String, required: true},
});

module.exports = mongoose.model('Bus', voitureSchema);
