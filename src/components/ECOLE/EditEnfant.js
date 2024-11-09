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
import mapboxgl from 'mapbox-gl';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { enfantsApi } from 'utils/apis';
import { uploadFile } from 'functions/frontend/uploadFile';

// Configure Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmV0YWNhcmRyaXZlIiwiYSI6ImNtMjB3OThpZDBrZXcyanNjdzJkYjBhd3kifQ.1Dg9uR6pAwpnuXr5X2P82A';


const EditEnfantModal = ({ isOpen, toggle, enfant, setEnfantsList }) => {
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.user.userData);
   const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [progressVal, setProgressVal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (enfant) {
      setFormData(enfant);
    }
  }, [enfant]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${enfantsApi}/${enfant._id}`, formData);
      setEnfantsList(prev => prev.map(item => (item._id === enfant._id ? response.data : item)));
      toggle();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la enfant :", error);
    }
  };

  const handlePickUpPointChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, pickUpPoint: value });
    if (value.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      setAutoCompleteResults(data.features);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imgUrl = await uploadFile(file, 'files', (progress) => {
          setProgressVal(progress);
        });
        setFormData({ ...formData, photo: imgUrl });
      } catch (error) {
        console.error("Erreur lors de l'upload du fichier :", error);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modifier la enfant</ModalHeader>
      <ModalBody>
         <Form onSubmit={handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="school">École</Label>
                <Input
                  type="text"
                  name="school"
                  id="school"
                  value={user.nomEcole}
                  placeholder="Nom de l'école"
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">Prénom de l'enfant</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">Nom de l'enfant</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="grade">Niveau scolaire</Label>
                <Input
                  type="text"
                  name="grade"
                  id="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="Classe de l'enfant"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="birthDate">Date de naissance</Label>
                <Input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="neighborhood">Quartier</Label>
                <Input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  placeholder="Quartier"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="pickUpPoint">Point de ramassage</Label>
                <Input
                  type="text"
                  name="pickUpPoint"
                  id="pickUpPoint"
                  placeholder="Saisissez un point"
                  value={formData.pickUpPoint?.place_name || ''}
                  onChange={handlePickUpPointChange}
                />
                {autoCompleteResults.length > 0 && (
                  <div style={{ position: 'absolute', zIndex: 1000, background: '#fff', border: '1px solid #ddd' }}>
                    {autoCompleteResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() =>{
                             setFormData({ ...formData, pickUpPoint: result })
                             setAutoCompleteResults([])
                        }}
                        style={{ padding: '5px', cursor: 'pointer' }}
                      >
                        {result.place_name}
                      </div>
                    ))}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="dropOffPoint">Point de dépose</Label>
                <Input
                  type="text"
                  name="dropOffPoint"
                  id="dropOffPoint"
                  value={formData.dropOffPoint}
                  onChange={handleChange}
                  placeholder="Adresse de dépose"
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="personInCharge">Personne en charge</Label>
            <Input
              type="text"
              name="personInCharge"
              id="personInCharge"
              value={formData.personInCharge}
              onChange={handleChange}
              placeholder="Nom de la personne"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Numéro de téléphone</Label>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Numéro de téléphone"
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Photo de l'enfant</Label>
            <Input type="file" name="photo" id="photo" onChange={handleFileChange} />
          </FormGroup>
           <FormGroup>
            <Label>Enfant en situation de mobilité réduite</Label>
            <div>
              <Input type="radio" name="isMobilityReduced" value="yes" onClick={() => setFormData({ ...formData, isMobilityReduced: true })} /> Oui
              <Input type="radio" name="isMobilityReduced" value="no" onClick={() => setFormData({ ...formData, isMobilityReduced: false })} /> Non
            </div>
            {formData.isMobilityReduced && (
              <div className="alert alert-warning mt-2">Nous ne disposons pas de véhicules adaptés pour les enfants à mobilité réduite.</div>
            )}
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">Date de début de la prise en charge</Label>
                <Input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="endDate">Date de fin de la prise en charge</Label>
                <Input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Services supplémentaires</Label>
            <div>
              <Input type="checkbox" name="tutoring" checked={formData.tutoring} onChange={handleChange} /> Cours de répétition après les classes
              {formData.tutoring && (
                <Row form className="mt-2">
                  <Col md={6}>
                    <Label for="tutoringStartDate">Date de début</Label>
                    <Input type="date" name="tutoringStartDate" id="tutoringStartDate" value={formData.tutoringStartDate} onChange={handleChange} />
                  </Col>
                  <Col md={6}>
                    <Label for="tutoringEndTime">Heure de fin</Label>
                    <Input type="time" name="tutoringEndTime" id="tutoringEndTime" value={formData.tutoringEndTime} onChange={handleChange} />
                  </Col>
                </Row>
              )}
            </div>
            <div>
              <Input type="checkbox" name="extraSchoolDays" checked={formData.extraSchoolDays} onChange={handleChange} /> Prise en charge des jours non scolaires
              {formData.extraSchoolDays && (
                <Row form className="mt-2">
                  <Col md={6}>
                    <Label for="extraDaysStartDate">Date de début</Label>
                    <Input type="date" name="extraDaysStartDate" id="extraDaysStartDate" value={formData.extraDaysStartDate} onChange={handleChange} />
                  </Col>
                  <Col md={6}>
                    <Label for="extraDaysArrivalTime">Heure d'arrivée</Label>
                    <Input type="time" name="extraDaysArrivalTime" id="extraDaysArrivalTime" value={formData.extraDaysArrivalTime} onChange={handleChange} />
                  </Col>
                </Row>
              )}
            </div>
          </FormGroup>
          <FormGroup>
          </FormGroup>
          <Button type="submit" color="primary" disabled={loading}>
            Ajouter l'enfant
          </Button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditEnfantModal;
