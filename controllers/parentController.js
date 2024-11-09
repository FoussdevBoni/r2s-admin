const Parent = require('../models/Parent');

// Créer un nouveau parent
exports.createParent = async (req, res) => {
  try {
    const { name, email, phone, address, password, enfants, cni } = req.body;

    const parent = new Parent({
      name,
      email,
      phone,
      address,
      password,
      enfants,
      cni
    });

    const savedParent = await parent.save();
    res.status(201).json(savedParent);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du parent', error });
  }
};

// Obtenir tous les parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate('enfants');
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des parents', error });
  }
};

// Obtenir un parent par ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id).populate('enfants');
    if (!parent) {
      return res.status(404).json({ message: 'Parent non trouvé' });
    }
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du parent', error });
  }
};

// Mettre à jour un parent par ID
exports.updateParent = async (req, res) => {
  try {
    const { name, email, phone, address, password, enfants, cni } = req.body;

    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, password, enfants, cni },
      { new: true }
    );

    if (!parent) {
      return res.status(404).json({ message: 'Parent non trouvé' });
    }

    res.status(200).json(parent);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du parent', error });
  }
};

// Supprimer un parent par ID
exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) {
      return res.status(404).json({ message: 'Parent non trouvé' });
    }
    res.status(200).json({ message: 'Parent supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du parent', error });
  }
};
