'use client'
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import { ecolesApi } from '@/utils/apis';
import { uploadFile } from '@/functions/frontend/uploadFile';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap

const EditEcoleModal = ({ isOpen, toggle, ecole, setEcolesList }) => {
  const [formData, setFormData] = useState({});
const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  useEffect(() => {
    if (ecole) {
      setFormData(ecole);
    }
  }, [ecole]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${ecolesApi}/${ecole._id}`, formData);
      setEcolesList(prev => prev.map(item => (item._id === ecole._id ? response.data : item)));
      toggle();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la ecole :", error);
    }
  };

  
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4)); // Assuming 4 steps
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Ensure step does not go below 1
  };

  // Gestion des sélections
  const handleSelection = (field, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [name]: !prevState[field][name],
      },
    }));
  };

  // Fonction pour déterminer si une option est sélectionnée
  const isSelected = (field, name) => formData[field][name] || false;

  const handleCheckboxChange = (field, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [name]: !prevState[field][name],
      },
    }));
  };


  const addLogo = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imgUrl = await uploadFile(file, 'logos');
        setFormData({ ...formData, logo: imgUrl });
      } catch (error) {
        console.error('Erreur lors de l\'upload du logo :', error);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modifier la ecole</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          {/* Étape 1 : Informations de l'École */}
          {currentStep === 1 && (
            <div>
              <h3>Informations de {"l'École"}</h3>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nomEcole">Nom de l'école</Label>
                    <Input type="text" name="nomEcole" value={formData.nomEcole} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="adresse">Adresse</Label>
                    <Input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ville">Ville</Label>
                    <Input type="text" name="ville" value={formData.ville} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="codePostal">Code Postal</Label>
                    <Input type="text" name="codePostal" value={formData.codePostal} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="telephoneEcole">Téléphone</Label>
                    <Input type="text" name="telephoneEcole" value={formData.telephoneEcole} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="emailEcole">Email</Label>
                    <Input type="email" name="emailEcole" value={formData.emailEcole} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>

              </Row>
               <FormGroup>
                    <Label for="password">Créer un mot de passe</Label>
                    <Input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                  </FormGroup>
              <FormGroup>
                <Label for="logo">Logo de {"l'école"}</Label>
                <Input type="file" accept="image/*" onChange={addLogo} />
                {formData.logo && <p>Logo chargé avec succès !</p>}
              </FormGroup>
            </div>
          )}

          {/* Étape 2 : Coordonnées du Responsable */}
          {currentStep === 2 && (
            <div>
              <h3>Coordonnées du Responsable</h3>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nomResponsable">Nom du Responsable</Label>
                    <Input type="text" name="nomResponsable" value={formData.nomResponsable} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="fonctionResponsable">Fonction</Label>
                    <Input type="text" name="fonctionResponsable" value={formData.fonctionResponsable} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="telephoneResponsable">Téléphone (si différent)</Label>
                    <Input type="text" name="telephoneResponsable" value={formData.telephoneResponsable} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="emailResponsable">Email</Label>
                    <Input type="email" name="emailResponsable" value={formData.emailResponsable} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          )}

          {/* Étape 3 : Informations supplémentaires */}
          {currentStep === 3 && (
            <div>
              <h3>Informations supplémentaires</h3>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nbElevesTransport">Nombre d'élèves à transporter</Label>
                    <Input type="number" name="nbElevesTransport" value={formData.nbElevesTransport} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="horairesDebut">Horaires de Début</Label>
                    <Input type="text" name="horairesDebut" value={formData.horairesDebut} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="horairesSortie">Horaires de Sortie</Label>
                    <Input type="text" name="horairesSortie" value={formData.horairesSortie} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="horairesMercredi">Horaires Mercredi</Label>
                    <Input type="text" name="horairesMercredi" value={formData.horairesMercredi} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <h5>Jours de Transport :</h5>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Jours de Transport</Label>
                    <div className="transport-options">
                      {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].map(day => (
                        <div
                          key={day}
                          className={`option ${isSelected('transportDays', day) ? 'selected' : ''}`}
                          onClick={() => handleSelection('transportDays', day)}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </div>
                      ))}
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <h5>Répartitions :</h5>
              <Row>
                  <Col md={6} >
                    <FormGroup check>
                        <div className="transport-options">
                      {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].map(day => (
                        <div
                          key={day}
                          className={`option ${isSelected('repetitions', day) ? 'selected' : ''}`}
                          onClick={() => handleSelection('repetitions', day)}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </div>
                      ))}
                    </div>
                    </FormGroup>
                  </Col>
            
              </Row>
              <FormGroup>
                <Label for="specificNeeds">Besoins spécifiques</Label>
                <Input type="text" name="specificNeeds" value={formData.specificNeeds} onChange={handleInputChange} />
              </FormGroup>
              <h5>Classes Ouvertes :</h5>
              <Row>
                {Object.keys(formData.classesOuvertes).map((classe) => (
                  <Col md={4} key={classe}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          checked={formData.classesOuvertes[classe]}
                          onChange={() => handleCheckboxChange('classesOuvertes', classe)}
                        />
                        {classe.charAt(0).toUpperCase() + classe.slice(1)}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Étape 4 : Termes et Conditions */}
          {currentStep === 4 && (
            <div>
              <h3>Termes et Conditions</h3>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
                    required
                  />
                  J'accepte les termes et conditions
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for="commentaires">Commentaires</Label>
                <Input type="textarea" name="commentaires" value={formData.commentaires} onChange={handleInputChange} />
              </FormGroup>
            </div>
          )}

          <ModalFooter>
            {currentStep > 1 && <Button color="secondary" onClick={prevStep}>Précédent</Button>}
            {currentStep < 4 && <Button color="primary" onClick={nextStep}>Suivant</Button>}
            {currentStep === 4 && (
              <Button color="primary" type="submit" disabled={loading}>
                {loading ? 'Chargement...' : 'Soumettre'}
              </Button>
            )}
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditEcoleModal;
