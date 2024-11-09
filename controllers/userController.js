const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisée' });
    }

    // Hacher le mot de passe et créer un nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, role });
    
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...userWithoutPassword } = user.toObject();
      
      res.json({ user: userWithoutPassword });
    } else {
      res.status(401).json({ error: 'Mots de passe ou email incorrect' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Connexion échouée' });
  }
};
