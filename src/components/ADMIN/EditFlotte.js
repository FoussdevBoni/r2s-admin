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
} from 'reactstrap';
import axios from 'axios';
import { flottesApi } from 'utils/apis';

const EditFlotteModal = ({ isOpen, toggle, flotte, setFlottesList }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (flotte) {
      setFormData(flotte);
    }
  }, [flotte]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${flottesApi}/${flotte._id}`, formData);
      setFlottesList(prev => prev.map(item => (item._id === flotte._id ? response.data : item)));
      toggle();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la flotte :", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modifier la flotte</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Nom</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Entrez le nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
        
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Entrez l'email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
         
          <FormGroup>
            <Label for="phone">Téléphone</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Entrez le téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Adresse</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Entrez l'adresse"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormGroup>
      
          <FormGroup>
            <Label for="cni">CNI</Label>
            <Input
              type="text"
              name="cni"
              id="cni"
              placeholder="Entrez la CNI"
              value={formData.cni}
              onChange={handleChange}
            />
          </FormGroup>
          {/* Vous pouvez ajouter des champs pour les chauffeurs et les véhicules si nécessaire */}
          <Button color="primary" type="submit">Ajouter</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditFlotteModal;
