const Ecole = require('../models/Ecole');
const fs = require('fs');
const path = require('path');

// Fonction pour enregistrer les erreurs dans un fichier de logs
const logErrorToFile = (error) => {
  const logPath = path.join(__dirname, 'error.log');
  const errorMessage = `${new Date().toISOString()} - Erreur : ${error.message}\n`;
  
  fs.appendFile(logPath, errorMessage, (err) => {
    if (err) {
      console.error('Impossible d\'écrire dans le fichier de logs', err);
    }
  });
};

// Créer une nouvelle école
exports.createEcole = async (req, res) => {
  try {
   

    const ecole = new Ecole(req.body);

    const savedEcole = await ecole.save();
    res.status(201).json(savedEcole);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Erreur lors de la création de l\'école', error });
  }
};

// Obtenir toutes les écoles
exports.getAllEcoles = async (req, res) => {
  try {
    const ecoles = await Ecole.find()
      .populate('enfants')
      .populate('bus');
    res.status(200).json(ecoles);
  } catch (error) {
    console.log(error)
     logErrorToFile(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des écoles', error });
  }
};

// Obtenir une école par ID
exports.getEcoleById = async (req, res) => {
  try {
    const ecole = await Ecole.findById(req.params.id)
      .populate('enfants')
      .populate('bus');
    if (!ecole) {
      return res.status(404).json({ message: 'École non trouvée' });
    }
    res.status(200).json(ecole);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'école', error });
  }
};
// READ - Récupérer une école par son userId
exports.getEcoleByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Recherche de l'admin par userId
    const ecole = await Ecole.findOne({ userId: userId });

    // Si l'admin n'est pas trouvé
    if (!ecole) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }

    // Réponse avec l'admin trouvé
    res.json(ecole);
  } catch (error) {
    console.log('ecoleError' , error)
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une école par ID
exports.updateEcole = async (req, res) => {
  try {
    const { name, email, phone, address, password, location, enfants, cni, bus, status } = req.body;

    const ecole = await Ecole.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, password, location, enfants, cni, bus, status },
      { new: true }
    );

    if (!ecole) {
      return res.status(404).json({ message: 'École non trouvée' });
    }

    res.status(200).json(ecole);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'école', error });
  }
};

// Supprimer une école par ID
exports.deleteEcole = async (req, res) => {
  try {
    const ecole = await Ecole.findByIdAndDelete(req.params.id);
    if (!ecole) {
      return res.status(404).json({ message: 'École non trouvée' });
    }
    res.status(200).json({ message: 'École supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'école', error });
  }
};
