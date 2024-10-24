const mongoose = require('mongoose');

const chauffeurSchema = new mongoose.Schema({
   // Informations utilis pour le system

   userId: { type: String, required: true },
   flotte: { type: mongoose.Types.ObjectId, ref: 'Flotte', required: false  },
   enfants: [{ type: mongoose.Types.ObjectId, ref: 'Enfant', required: false }],

  // Identité du chauffeur
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateNaissance: { type: String, required: true },
  lieuNaissance: { type: String, required: true },
  villeNaissance: { type: String, required: true },
  email: { type: String, required: true },
  quartier: { type: String, required: true },
  secteur: { type: String, required: true },
  villeResidence: { type: String, required: true },
  nationalite: { type: String, required: true },
  numeroTelephone: { type: String, required: true },
  numeroTelephoneSecondaire: { type: String },
  cni: { type: String, required: true },
  dateValiditeCni: { type: String, required: true },
  numeroPermis: { type: String, required: true },
  dateValiditePermis: { type: String, required: true },
  numeroImmatriculation: { type: String, required: true },
  modeleVehicule: { type: String, required: true },
  anneeFabricationVehicule: { type: String, required: true },
  carteGrise: { type: String, required: true },
  
  // Information du garant
  numeroGarant: { type: String, required: true },
  statutGarant: { type: String, required: true },

  // Documents
  photocopieAvantCni: { type: String, required: true },  // Lien vers la photo de la CNI (avant)
  photocopieArriereCni: { type: String, required: true },  // Lien vers la photo de la CNI (avant)
    
     photoVoitureAile: { type: String, required: true },  // Lien vers la photo de la CNI (avant)

photoVoitureInterieur: { type: String, required: true },  // Lien vers la photo de la CNI (avant)

  photocopieCniGarantAvant: { type: String, required: true },  // Lien vers la photo de la CNI (avant)
   photocopieCniGarantArriere: { type: String, required: true },  // Lien vers la photo de la CNI (avant)
  casierJudiciaire: { type: String, required: true }, // Lien vers le casier judiciaire
  planLocalisation: { type: String, required: true }, // Lien vers le plan de localisation
  photoProfil: { type: String, required: true }, // Lien vers la photo de profil du chauffeur
  photoEntiere: { type: String, required: true }, // Lien vers la photo entière du chauffeur
  photocopiePermis: { type: String, required: true }, // Lien vers la photocopie du permis

  // Réglementation
  assurance: { type: Boolean, required: true }, // Assurance à jour : oui / non
  typeAssurance: { type: String, enum: ['vehicule', 'passager', 'lesDeux'], required: true }, // Type d'assurance
  validiteAssurance: { type: String, required: true }, // String de validité de l'assurance
  visiteTechnique: { type: Boolean, required: true }, // Visite technique à jour : oui / non
}, {
  timestamps: true // Pour ajouter automatiquement les champs createdAt et updatedAt
});

const Chauffeur = mongoose.model('Chauffeur', chauffeurSchema);

module.exports = Chauffeur;
