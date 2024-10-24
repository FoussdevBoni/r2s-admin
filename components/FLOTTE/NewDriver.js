import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Progress,
  Col,
  Row
} from 'reactstrap';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { uploadFile } from 'functions/frontend/uploadFile';
import { driversApi } from 'utils/apis';
import { useSelector } from 'react-redux';

const AddDriverModal = ({ isOpen, toggle }) => {
   const currentUser = useSelector(state=>state.user.userData)
  const [currentStep, setCurrentStep] = useState(1);
  const [progressVal, setProgressVal] = useState(1);
  const [formData, setFormData] = useState({
  
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const addFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imgUrl = await uploadFile(file, 'files', (progress) => {
          setProgressVal(progress);
        });
        setFormData({ ...formData, [e.target.name]: imgUrl });
      } catch (error) {
        console.error('Erreur lors de l\'upload du fichier :', error);
      }
    }
  };

  const addDriver = async (userId) => {
    try {
      const response = await axios.post(driversApi, { ...formData, userId , flotte: currentUser._id , role: 'chauffeur' });
      toggle();
      setFormData({});
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la driver :', error);
      setError('Erreur lors de l\'ajout de la driver. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await addDriver(userCredential.user.uid);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        
        // Gestion des erreurs
        switch (error.code) {
            case 'auth/network-request-failed':
                setError('Vérifiez votre connexion Internet pour pouvoir continuer.');
                break;
            case 'auth/weak-password':
                setError('Le mot de passe doit comporter au moins 6 caractères.');
                break;
            case 'auth/email-already-in-use':
                setError('Cette adresse e-mail est déjà utilisée par un autre compte.');
                break;
            // Ajoutez d'autres codes d'erreur selon vos besoins
            default:
                setError('Une erreur inconnue est survenue. Veuillez réessayer plus tard.');
        }
    } finally {
        setLoading(false);
    }
};


  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Formulaire d'Enregistrement du Chauffeur</ModalHeader>
      <ModalBody>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          {/* Step 1: Identité du chauffeur */}
          {currentStep === 1 && (
            <>
              <h4>Identité du chauffeur</h4>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nom">Nom(s)</Label>
                    <Input type="text" id="nom" name="nom" onChange={handleChange} placeholder="Entrer le nom" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="prenom">Prénom(s)</Label>
                    <Input type="text" id="prenom" name="prenom" onChange={handleChange} placeholder="Entrer le prénom" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="dateNaissance">Date de naissance</Label>
                    <Input type="date" id="dateNaissance" name="dateNaissance" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lieuNaissance">Lieu de naissance</Label>
                    <Input type="text" id="lieuNaissance" name="lieuNaissance" onChange={handleChange} placeholder="Entrer le lieu de naissance" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="villeNaissance">Ville de naissance</Label>
                    <Input type="text" id="villeNaissance" name="villeNaissance" onChange={handleChange} placeholder="Entrer la ville de naissance" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Adresse mail</Label>
                    <Input type="email" id="email" name="email" onChange={handleChange} placeholder="Entrer l'adresse mail" />
                  </FormGroup>
                </Col>
                 <Col md={6}>
                  <FormGroup>
                    <Label for="password">Créer un mot de passe</Label>
                    <Input type="password" id="password" name="password" onChange={handleChange} placeholder="Entrer un mot de passe d'au moins six caractères" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="quartier">Quartier</Label>
                    <Input type="text" id="quartier" name="quartier" onChange={handleChange} placeholder="Entrer le quartier" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="secteur">Secteur d’habitation</Label>
                    <Input type="text" id="secteur" name="secteur" onChange={handleChange} placeholder="Entrer le secteur" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="villeResidence">Ville de residence</Label>
                    <Input type="text" id="villeResidence" name="villeResidence" onChange={handleChange} placeholder="Entrer la ville de residence" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nationalite">Nationalité</Label>
                    <Input type="text" id="nationalite" name="nationalite" onChange={handleChange} placeholder="Entrer la nationalité" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="numeroTelephone">Numéro de téléphone principal</Label>
                    <Input type="text" id="numeroTelephone" name="numeroTelephone" onChange={handleChange} placeholder="Entrer le numéro principal" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="numeroTelephoneSecondaire">Numéro de téléphone secondaire (facultatif)</Label>
                    <Input type="text" id="numeroTelephoneSecondaire" name="numeroTelephoneSecondaire" onChange={handleChange} placeholder="Entrer le numéro secondaire" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="cni">Numéro de CNI</Label>
                    <Input type="text" id="cni" name="cni" onChange={handleChange} placeholder="Entrer le numéro de CNI" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="dateValiditeCni">Date de validité de la CNI</Label>
                    <Input type="date" id="dateValiditeCni" name="dateValiditeCni" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="numeroPermis">Numéro du permis de conduire</Label>
                    <Input type="text" id="numeroPermis" name="numeroPermis" onChange={handleChange} placeholder="Entrer le numéro du permis" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="dateValiditePermis">Date de validité du permis de conduire</Label>
                    <Input type="date" id="dateValiditePermis" name="dateValiditePermis" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="numeroImmatriculation">Numéro d’immatriculation</Label>
                    <Input type="text" id="numeroImmatriculation" name="numeroImmatriculation" onChange={handleChange} placeholder="Entrer le numéro d’immatriculation" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="modeleVehicule">Modèle du véhicule</Label>
                    <Input type="text" id="modeleVehicule" name="modeleVehicule" onChange={handleChange} placeholder="Entrer le modèle du véhicule" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="anneeFabricationVehicule">Année de fabrication du véhicule</Label>
                    <Input type="text" id="anneeFabricationVehicule" name="anneeFabricationVehicule" onChange={handleChange} placeholder="Entrer l'année de fabrication" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="carteGrise">Numéro carte grise</Label>
                    <Input type="text" id="carteGrise" name="carteGrise" onChange={handleChange} placeholder="Entrer le numéro de la carte grise" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="numeroGarant">Numéro d’un garant</Label>
                    <Input type="text" id="numeroGarant" name="numeroGarant" onChange={handleChange} placeholder="Entrer le numéro du garant" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="statutGarant">Statut du garant</Label>
                    <Input type="text" id="statutGarant" name="statutGarant" onChange={handleChange} placeholder="Entrer le statut du garant" />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary" onClick={nextStep}>Suivant</Button>
            </>
          )}

          {/* Step 2: Documents */}
          {currentStep === 2 && (
            <>
              <h4>Documents</h4>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photocopieAvantCni">Photocopie avant CNI</Label>
                    <Input type="file" id="photocopieAvantCni" name="photocopieAvantCni" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photocopieArriereCni">Photocopie arrière CNI</Label>
                    <Input type="file" id="photocopieArriereCni" name="photocopieArriereCni" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photoVoitureAvant">Photo de la voiture (avant)</Label>
                    <Input type="file" id="photoVoitureAvant" name="photoVoitureAvant" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photoVoitureArriere">Photo de la voiture (arrière)</Label>
                    <Input type="file" id="photoVoitureArriere" name="photoVoitureArriere" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photoVoitureInterieur">Photo de la voiture (intérieur)</Label>
                    <Input type="file" id="photoVoitureInterieur" name="photoVoitureInterieur" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photoVoitureAile">Photo de la voiture (aile)</Label>
                    <Input type="file" id="photoVoitureAile" name="photoVoitureAile" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photocopieCniGarantAvant">Photocopie CNI (avant) du garant</Label>
                    <Input type="file" id="photocopieCniGarantAvant" name="photocopieCniGarantAvant" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photocopieCniGarantArriere">Photocopie CNI (arrière) du garant</Label>
                    <Input type="file" id="photocopieCniGarantArriere" name="photocopieCniGarantArriere" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="casierJudiciaire">Casier judiciaire</Label>
                    <Input type="file" id="casierJudiciaire" name="casierJudiciaire" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="planLocalisation">Plan de localisation</Label>
                    <Input type="file" id="planLocalisation" name="planLocalisation" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photoProfil">Photo de profil du chauffeur</Label>
                    <Input type="file" id="photoProfil" name="photoProfil" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photoEntiere">Photo entière du chauffeur</Label>
                    <Input type="file" id="photoEntiere" name="photoEntiere" onChange={addFile} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="photocopiePermis">Photocopie du permis de conduire</Label>
                    <Input type="file" id="photocopiePermis" name="photocopiePermis" onChange={addFile} />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="secondary" onClick={prevStep}>Précédent</Button>{' '}
              <Button color="primary" onClick={nextStep}>Suivant</Button>
            </>
          )}

          {/* Step 3: Réglementation */}
          {currentStep === 3 && (
            <>
              <h4>Réglementation</h4>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="assurance">Assurance à jour</Label>
                    <div>
                      <Label check>
                        <Input type="checkbox" name="assurance" value="oui" onChange={handleChange} /> Oui
                      </Label>
                      <Label check>
                        <Input type="checkbox" name="assurance" value="non" onChange={handleChange} /> Non
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="typeAssurance">Type d’assurance</Label>
                    <div>
                      <Label check>
                        <Input type="checkbox" name="typeAssurance" value="vehicule" onChange={handleChange} /> Véhicule
                      </Label>
                      <Label check>
                        <Input type="checkbox" name="typeAssurance" value="passager" onChange={handleChange} /> Passager
                      </Label>
                      <Label check>
                        <Input type="checkbox" name="typeAssurance" value="lesDeux" onChange={handleChange} /> Les deux
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="validiteAssurance">Validité de l’assurance</Label>
                    <Input type="date" id="validiteAssurance" name="validiteAssurance" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="visiteTechnique">Visite technique à jour</Label>
                    <div>
                      <Label check>
                        <Input type="checkbox" name="visiteTechnique" value="oui" onChange={handleChange} /> Oui
                      </Label>
                      <Label check>
                        <Input type="checkbox" name="visiteTechnique" value="non" onChange={handleChange} /> Non
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Button color="secondary" onClick={prevStep}>Précédent</Button>{' '}
              <Button color="primary" type="submit" disabled={loading}>
                {loading ? 'Enregistrement...' : 'Soumettre'}
              </Button>
            </>
          )}
        </Form>
        {loading && <Progress value={progressVal} />}
      </ModalBody>
    </Modal>
  );
};

export default AddDriverModal;
