const Admin = require('../models/Admin');

// CREATE - Ajouter un nouvel administrateur
exports.createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - Récupérer tous les administrateurs
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Récupérer un administrateur par ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Récupérer un administrateur par son userId
exports.getAdminByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Recherche de l'admin par userId
    const admin = await Admin.findOne({ userId: userId });

    // Si l'admin n'est pas trouvé
    if (!admin) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }

    // Réponse avec l'admin trouvé
    res.json(admin);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - Mettre à jour un administrateur par ID
exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Supprimer un administrateur par ID
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }
    res.json({ message: 'Administrateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
