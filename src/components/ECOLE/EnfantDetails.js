import formaterDateISO8601 from 'functions/frontend/formatDate';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem, Row, Col, Badge } from 'reactstrap';
import EditEnfantModal from './EditEnfant';

const EnfantDetails = ({ isOpen, toggle, enfant , setEnfantsList}) => {
  
  const user = useSelector((state) => state.user.userData);
  const [editModalOpen, setEditModalOpen] = useState(false);


   
  

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };
 
  return (
    <>
     {enfant &&   <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Les informations de l'enfant
      </ModalHeader>
      <ModalBody>
            <Card>
      <CardBody>
        <CardTitle tag="h4">
          {enfant.firstName} {enfant.lastName}
        </CardTitle>
        <CardSubtitle className="mb-3">
          Classe : {enfant.grade}
        </CardSubtitle>
        <ListGroup flush>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>École :</strong></Col>
              <Col md={6}>{user.nomEcole}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Date de Naissance :</strong></Col>
              <Col md={6}>{formaterDateISO8601(enfant.birthDate)}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Quartier :</strong></Col>
              <Col md={6}>{enfant.neighborhood}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Point de Ramassage :</strong></Col>
              <Col md={6}>{enfant.pickUpPoint?.place_name || 'Non défini'}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Point de Dépose :</strong></Col>
              <Col md={6}>{enfant.dropOffPoint}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Personne en Charge :</strong></Col>
              <Col md={6}>{enfant.personInCharge}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Téléphone :</strong></Col>
              <Col md={6}>{enfant.phoneNumber}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Mobilité Réduite :</strong></Col>
              <Col md={6}>
                {enfant.isMobilityReduced ? (
                  <Badge color="danger">Oui</Badge>
                ) : (
                  <Badge color="success">Non</Badge>
                )}
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Date de Début :</strong></Col>
              <Col md={6}>{enfant.startDate}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Date de Fin :</strong></Col>
              <Col md={6}>{enfant.endDate}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Tutorat :</strong></Col>
              <Col md={6}>{enfant.tutoring ? 'Oui' : 'Non'}</Col>
            </Row>
          </ListGroupItem>
          {enfant.tutoring && (
            <>
              <ListGroupItem>
                <Row>
                  <Col md={6}><strong>Date de Début Tutorat :</strong></Col>
                  <Col md={6}>{enfant.tutoringStartDate}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={6}><strong>Heure de Fin Tutorat :</strong></Col>
                  <Col md={6}>{enfant.tutoringEndTime}</Col>
                </Row>
              </ListGroupItem>
            </>
          )}
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Jours Supplémentaires :</strong></Col>
              <Col md={6}>{enfant.extraSchoolDays ? 'Oui' : 'Non'}</Col>
            </Row>
          </ListGroupItem>
          {enfant.extraSchoolDays && (
            <>
              <ListGroupItem>
                <Row>
                  <Col md={6}><strong>Date de Début Jours Supplémentaires :</strong></Col>
                  <Col md={6}>{enfant.extraDaysStartDate}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={6}><strong>Heure d'Arrivée Jours Supplémentaires :</strong></Col>
                  <Col md={6}>{enfant.extraDaysArrivalTime}</Col>
                </Row>
              </ListGroupItem>
            </>
          )}
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Photo :</strong></Col>
              <Col md={6}>
                {enfant.photo ? (
                  <img src={enfant.photo} alt="Photo de l'enfant" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                ) : (
                  'Non disponible'
                )}
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md={6}><strong>Prix Total :</strong></Col>
              <Col md={6}>{enfant.totalPrice} €</Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
      </ModalBody>
      <ModalFooter>
        <Button   color="info" onClick={toggleEditModal}>
          Modifier
        </Button>
      </ModalFooter>
    </Modal>}

    <EditEnfantModal 
      isOpen={editModalOpen}
     toggle={toggleEditModal}
    enfant={enfant}
     setEnfantsList={setEnfantsList}
    />
    </>
  );
};

export default EnfantDetails;
