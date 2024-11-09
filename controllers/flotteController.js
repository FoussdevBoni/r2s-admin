const Flotte = require('../models/Flotte');

// Créer une nouvelle flotte
exports.createFlotte = async (req, res) => {
  try {
  

    const flotte = new Flotte(req.body);

    const savedFlotte = await flotte.save();
    console.log(savedFlotte)
    res.status(201).json(savedFlotte);
  } catch (error) {
        console.log(error)

    res.status(400).json({ message: 'Erreur lors de la création de la flotte', error });
  }
};

// Obtenir toutes les flottes
exports.getAllFlottes = async (req, res) => {
  try {
    const flottes = await Flotte.find()
      .populate('chauffeurs') // Inclure les informations des chauffeurs associés
      .populate('vehicles');  // Inclure les informations des véhicules associés
    res.status(200).json(flottes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des flottes', error });
  }
};

// Obtenir une flotte par ID
exports.getFlotteById = async (req, res) => {
  try {
    const flotte = await Flotte.findById(req.params.id)
      .populate('chauffeurs')
      .populate('vehicles');
    if (!flotte) {
      return res.status(404).json({ message: 'Flotte non trouvée' });
    }
    res.status(200).json(flotte);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la flotte', error });
  }
};
exports.getFlotteByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Recherche de la flotte  par userId
    const flotte = await Flotte.findOne({ userId: userId });

    // Si l'admin n'est pas trouvé
    if (!flotte) {
      console.log({ message: 'Flotte non trouvée' });
    }

    // Réponse avec la flotte trouvée
    res.json(flotte);
  } catch (error) {
    console.log('flotteError' , error)
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une flotte par ID
exports.updateFlotte = async (req, res) => {
  try {
    const { name, email, phone, address, password, location, chauffeurs, cni, vehicles } = req.body;

    const flotte = await Flotte.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, password, location, chauffeurs, cni, vehicles },
      { new: true }
    );

    if (!flotte) {
      return res.status(404).json({ message: 'Flotte non trouvée' });
    }

    res.status(200).json(flotte);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la flotte', error });
  }
};

// Supprimer une flotte par ID
exports.deleteFlotte = async (req, res) => {
  try {
    const flotte = await Flotte.findByIdAndDelete(req.params.id);
    if (!flotte) {
      return res.status(404).json({ message: 'Flotte non trouvée' });
    }
    res.status(200).json({ message: 'Flotte supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la flotte', error });
  }
};
