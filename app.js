const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const dotenv = require('dotenv')
dotenv.config();


// Middleware pour analyser les requêtes JSON et gérer CORS
app.use(express.json());
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};

app.use(cors(corsOptions));

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

// Route pour afficher "Hello World" lorsque tout fonctionne correctement
app.get('/', async (req, res) => {
  console.log('hello word')
});

// Importer les routes
const routes = require('./routes');
app.use('/', routes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log(err);
    logErrorToFile(err);  // Enregistrer l'erreur de connexion à MongoDB
  });

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
