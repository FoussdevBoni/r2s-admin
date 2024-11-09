const Voiture = require('../models/Voiture');

// Créer une nouvelle voiture
exports.createVoiture = async (req, res) => {
  try {
    const { name, immatriculation, location, enfants, cni } = req.body;

    const voiture = new Voiture({
      name,
      immatriculation,
      location,
      enfants,
      cni
    });

    const savedVoiture = await voiture.save();
    res.status(201).json(savedVoiture);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la voiture', error });
  }
};

// Obtenir toutes les voitures
exports.getAllVoitures = async (req, res) => {
  try {
    const voitures = await Voiture.find().populate('enfants'); // `populate` pour inclure les informations des enfants
    res.status(200).json(voitures);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des voitures', error });
  }
};

// Obtenir une voiture par ID
exports.getVoitureById = async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id).populate('enfants');
    if (!voiture) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.status(200).json(voiture);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la voiture', error });
  }
};

// Mettre à jour une voiture par ID
exports.updateVoiture = async (req, res) => {
  try {
    const { name, immatriculation, location, enfants, cni } = req.body;

    const voiture = await Voiture.findByIdAndUpdate(
      req.params.id,
      { name, immatriculation, location, enfants, cni },
      { new: true } // Pour retourner la nouvelle version du document mis à jour
    );

    if (!voiture) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }

    res.status(200).json(voiture);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la voiture', error });
  }
};

// Supprimer une voiture par ID
exports.deleteVoiture = async (req, res) => {
  try {
    const voiture = await Voiture.findByIdAndDelete(req.params.id);
    if (!voiture) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.status(200).json({ message: 'Voiture supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la voiture', error });
  }
};
