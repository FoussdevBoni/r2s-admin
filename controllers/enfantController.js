const Enfant = require('../models/Enfant');

// Créer un nouvel enfant
exports.createEnfant = async (req, res) => {
  try {


    const enfant = new Enfant(
      req.body);

    const savedEnfant = await enfant.save();
    res.status(201).json(savedEnfant);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Erreur lors de la création de l\'enfant', error });
  }
};

// Obtenir tous les enfants
exports.getAllEnfants = async (req, res) => {
  try {
    const enfants = await Enfant.find()
   ;
    res.status(200).json(enfants);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des enfants', error });
  }
};

// Obtenir un enfant par ID
exports.getEnfantById = async (req, res) => {
  try {
    const enfant = await Enfant.findById(req.params.id)
      .populate('parent')
      .populate('chauffeur')
      .populate('abonnement')
      .populate('ecole');
    if (!enfant) {
      return res.status(404).json({ message: 'Enfant non trouvé' });
    }
    res.status(200).json(enfant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'enfant', error });
  }
};

// Mettre à jour un enfant par ID
exports.updateEnfant = async (req, res) => {
  try {
    const { lastname, firstname, email, phone, address, password, photo, parent, chauffeur, abonnement, ecole } = req.body;

    const enfant = await Enfant.findByIdAndUpdate(
      req.params.id,
      { lastname, firstname, email, phone, address, password, photo, parent, chauffeur, abonnement, ecole },
      { new: true }
    );

    if (!enfant) {
      return res.status(404).json({ message: 'Enfant non trouvé' });
    }

    res.status(200).json(enfant);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'enfant', error });
  }
};

// Supprimer un enfant par ID
exports.deleteEnfant = async (req, res) => {
  try {
    const enfant = await Enfant.findByIdAndDelete(req.params.id);
    if (!enfant) {
      return res.status(404).json({ message: 'Enfant non trouvé' });
    }
    res.status(200).json({ message: 'Enfant supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'enfant', error });
  }
};
