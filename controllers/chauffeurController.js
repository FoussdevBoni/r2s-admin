const Chauffeur = require("../models/Chauffeur");

// Créer un nouveau chauffeur
exports.createChauffeur = async (req, res) => {
       console.log('chauffeur' , req.body)

  try {
    const chauffeur = new Chauffeur(req.body); 
    const savedChauffeur = await chauffeur.save(); 

    res.status(201).json(savedChauffeur); 
    
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Erreur lors de la création du chauffeur', error });
  }
};

// Récupérer tous les chauffeurs
exports.getChauffeurs = async (req, res) => {
  try {
    const chauffeurs = await Chauffeur.find().populate('flotte vehicle enfants'); // Récupérer tous les chauffeurs avec les relations peuplées
    res.status(200).json(chauffeurs); // Envoyer la liste des chauffeurs
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des chauffeurs', error });
  }
};

// Récupérer un chauffeur par ID
exports.getChauffeurById = async (req, res) => {
  try {
    const chauffeur = await Chauffeur.findById(req.params.id).populate('flotte vehicle enfants'); // Trouver un chauffeur par ID
    if (!chauffeur) return res.status(404).json({ message: 'Chauffeur non trouvé' });
    res.status(200).json(chauffeur); // Envoyer le chauffeur trouvé
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du chauffeur', error });
  }
};

// Mettre à jour un chauffeur
exports.updateChauffeur = async (req, res) => {
  try {
    const updatedChauffeur = await Chauffeur.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true } // Renvoie le document mis à jour
    ).populate('flotte vehicle enfants');
    if (!updatedChauffeur) return res.status(404).json({ message: 'Chauffeur non trouvé' });
    res.status(200).json(updatedChauffeur); // Envoyer le chauffeur mis à jour
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du chauffeur', error });
  }
};

// Supprimer un chauffeur
exports.deleteChauffeur = async (req, res) => {
  try {
    const deletedChauffeur = await Chauffeur.findByIdAndDelete(req.params.id); // Supprimer le chauffeur par ID
    if (!deletedChauffeur) return res.status(404).json({ message: 'Chauffeur non trouvé' });
    res.status(200).json({ message: 'Chauffeur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du chauffeur', error });
  }
};
