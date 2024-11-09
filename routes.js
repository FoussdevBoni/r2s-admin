const express = require('express');
const router = express.Router();
const chauffeurController = require('./controllers/chauffeurController');
const parentController = require('./controllers/parentController');
const flotteController = require('./controllers/flotteController');
const enfantController = require('./controllers/enfantController');
const ecoleController = require('./controllers/ecoleController');
const voitureController = require('./controllers/voitureController');
const adminController = require('./controllers/adminController');
const userController  = require('./controllers/userController')

router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes CRUD pour Admin
router.post('/admins', adminController.createAdmin);
router.get('/admins', adminController.getAllAdmins);
router.get('/admins/:id', adminController.getAdminById);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', adminController.deleteAdmin);
router.get('/admins/user/:userId', adminController.getAdminByUserId);

// Routes pour les voitures
router.post('/voitures', voitureController.createVoiture);
router.get('/voitures', voitureController.getAllVoitures);
router.get('/voitures/:id', voitureController.getVoitureById);
router.put('/voitures/:id', voitureController.updateVoiture);
router.delete('/voitures/:id', voitureController.deleteVoiture);
// Routes pour les écoles
router.post('/ecoles', ecoleController.createEcole);
router.get('/ecoles', ecoleController.getAllEcoles);
router.get('/ecoles/:id', ecoleController.getEcoleById);
router.get('/ecoles/user/:userId', ecoleController.getEcoleByUserId);

router.put('/ecoles/:id', ecoleController.updateEcole);
router.delete('/ecoles/:id', ecoleController.deleteEcole);

// Routes pour les enfants
router.post('/enfants', enfantController.createEnfant);
router.get('/enfants', enfantController.getAllEnfants);
router.get('/enfants/:id', enfantController.getEnfantById);
router.put('/enfants/:id', enfantController.updateEnfant);
router.delete('/enfants/:id', enfantController.deleteEnfant)

// Routes pour les flottes
router.post('/flottes', flotteController.createFlotte);
router.get('/flottes', flotteController.getAllFlottes);
router.get('/flottes/:id', flotteController.getFlotteById);
router.get('/flottes/user/:userId', flotteController.getFlotteByUserId);
router.put('/flottes/:id', flotteController.updateFlotte);
router.delete('/flottes/:id', flotteController.deleteFlotte);

// Routes pour les parents
router.post('/parents', parentController.createParent);
router.get('/parents', parentController.getAllParents);
router.get('/parents/:id', parentController.getParentById);
router.put('/parents/:id', parentController.updateParent);
router.delete('/parents/:id', parentController.deleteParent);



// Routes pour les entités Parent
router.post('/chauffeurs', chauffeurController.createChauffeur);
router.get('/chauffeurs', chauffeurController.getChauffeurs);
router.get('/chauffeurs/:id', chauffeurController.getChauffeurById);
router.put('/chauffeurs/:id', chauffeurController.updateChauffeur);
router.delete('/chauffeurs/:id', chauffeurController.deleteChauffeur);



module.exports = router;
