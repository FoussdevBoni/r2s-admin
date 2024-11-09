import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Progress
} from 'reactstrap';
import axios from 'axios';
import { flottesApi } from 'utils/apis'; // Remplacez par votre API
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { uploadFile } from 'functions/frontend/uploadFile';
import { registerApi } from 'utils/apis';

const AddFlotteModal = ({ isOpen, toggle }) => {
  const [progressVal, setProgressVal] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    logo: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    rccmNumber: '',
    niuNumber: '',
    creationDate: '',
    managerName: '',
    function: '',
    cniNumber: '',
    cniValidity: '',
    managerPhone: '',
    managerEmail: '',
    managerPhoto: '',
    cniFrontImage: '',
    cniBackImage: '',
    numberOfVehicles: '',
    vehicleTypes: '',
    vehicleCertifications: false,
    vehicleInsurances: false,
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    consentAccepted: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const addLogo = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imgUrl = await uploadFile(file, 'logos', (progress) => {
          setProgressVal(progress);
        });
        setFormData({ ...formData, managerPhoto: imgUrl });
      } catch (error) {
        console.error('Erreur lors de l\'upload du logo :', error);
      }
    }
  };

  const addFlotte = async (userId) => {
    try {
      const response = await axios.post(flottesApi, { ...formData, userId });
      toggle();
      // Réinitialiser le formulaire
      setFormData({
        companyName: '',
        logo: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        email: '',
        rccmNumber: '',
        niuNumber: '',
        creationDate: '',
        managerName: '',
        function: '',
        cniNumber: '',
        cniValidity: '',
        managerPhone: '',
        managerEmail: '',
        managerPhoto: '',
        cniFrontImage: '',
        cniBackImage: '',
        numberOfVehicles: '',
        vehicleTypes: '',
        vehicleCertifications: false,
        vehicleInsurances: false,
        username: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        consentAccepted: false,
        statut: 'actif',
        performance: 1
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la flotte :', error);
      setError('Erreur lors de l\'ajout de la flotte. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
       const data = (await axios.post(registerApi , {email: formData.email , password: formData.password , role: 'flotte'})).data
      const userId = data._id
      await addFlotte(userId);
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      setError('Erreur lors de la création de l\'utilisateur.');
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Formulaire d'Enregistrement des Partenaires de Flottes R2S</ModalHeader>
      <ModalBody>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          {/* Informations de l'Entreprise */}
          <h5>Informations de l'Entreprise</h5>
          <FormGroup>
            <Label for="companyName">Nom de l'Entreprise</Label>
            <Input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="address">Adresse</Label>
            <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="city">Ville</Label>
            <Input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="postalCode">Code Postal</Label>
            <Input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Téléphone</Label>
            <Input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="rccmNumber">RCCM Numéro</Label>
            <Input type="text" name="rccmNumber" id="rccmNumber" value={formData.rccmNumber} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="niuNumber">NIU Numéro</Label>
            <Input type="text" name="niuNumber" id="niuNumber" value={formData.niuNumber} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="creationDate">Date de création</Label>
            <Input type="text" name="creationDate" id="creationDate" value={formData.creationDate} onChange={handleChange} required />
          </FormGroup>

          {/* Coordonnées du Responsable */}
          <h5>Coordonnées du Responsable</h5>
          <FormGroup>
            <Label for="managerName">Nom du Responsable</Label>
            <Input type="text" name="managerName" id="managerName" value={formData.managerName} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="function">Fonction</Label>
            <Input type="text" name="function" id="function" value={formData.function} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="cniNumber">CNI Numéro</Label>
            <Input type="text" name="cniNumber" id="cniNumber" value={formData.cniNumber} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="cniValidity">Date de validité</Label>
            <Input type="text" name="cniValidity" id="cniValidity" value={formData.cniValidity} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="managerPhone">Téléphone (si différent)</Label>
            <Input type="text" name="managerPhone" id="managerPhone" value={formData.managerPhone} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="managerEmail">Email (si différent)</Label>
            <Input type="email" name="managerEmail" id="managerEmail" value={formData.managerEmail} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="managerPhoto">Photo du Responsable</Label>
            <Input type="file" name="managerPhoto" id="managerPhoto" onChange={addLogo} />
          </FormGroup>
          <FormGroup>
            <Label for="cniFrontImage">Image avant de la CNI</Label>
            <Input type="file" name="cniFrontImage" id="cniFrontImage" onChange={addLogo} />
          </FormGroup>
          <FormGroup>
            <Label for="cniBackImage">Image arrière de la CNI</Label>
            <Input type="file" name="cniBackImage" id="cniBackImage" onChange={addLogo} />
          </FormGroup>

          {/* Détails de la Flotte */}
          <h5>Détails de la Flotte</h5>
          <FormGroup>
            <Label for="numberOfVehicles">Nombre de Véhicules</Label>
            <Input type="number" name="numberOfVehicles" id="numberOfVehicles" value={formData.numberOfVehicles} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="vehicleTypes">Types de Véhicules</Label>
            <Input type="textarea" name="vehicleTypes" id="vehicleTypes" value={formData.vehicleTypes} onChange={handleChange} required />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="vehicleCertifications" id="vehicleCertifications" checked={formData.vehicleCertifications} onChange={handleChange} />
              Certificat de Conformité des Véhicules
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="vehicleInsurances" id="vehicleInsurances" checked={formData.vehicleInsurances} onChange={handleChange} />
              Assurance des Véhicules
            </Label>
          </FormGroup>

          {/* Section de Connexion */}
          <h5>Informations de Connexion</h5>
          <FormGroup>
            <Label for="username">Nom d'Utilisateur</Label>
            <Input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="password">Mot de Passe</Label>
            <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirmez le Mot de Passe</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </FormGroup>

          {/* Consentements */}
          <h5>Consentements</h5>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="termsAccepted" id="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
              J'accepte les Termes et Conditions
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="consentAccepted" id="consentAccepted" checked={formData.consentAccepted} onChange={handleChange} required />
              Je consens à l'utilisation de mes données
            </Label>
          </FormGroup>

          <ModalFooter>
            <Button color="primary" type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button color="secondary" onClick={toggle}>Annuler</Button>
          </ModalFooter>
        </Form>
        {progressVal > 1 && <Progress animated color="success" value={progressVal} />}
      </ModalBody>
    </Modal>
  );
};

export default AddFlotteModal;
