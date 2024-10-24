"use client"

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Header from "@/components/Headers/Header.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ecolesApi } from "@/utils/apis";
import { setEcoles } from "@/reducer/ecolesSlice";
import AddEcoleModal from "./NewEcole"; 
import EditEcoleModal from "./EditEcole"; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap

const EcolesTable = () => {
  const ecolesRedux = useSelector((state) => state.ecoles.ecolesData);
  const [ecoles, setEcolesList] = useState([]);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEcole, setSelectedEcole] = useState(null);


   
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    const getEcoles = async () => {
      try {
        const response = await axios.get(ecolesApi);
        const data = response.data;

        if (data && data.length > 0) {
          dispatch(setEcoles(data));
          setEcolesList(data);
        } else {
          setEcolesList(ecolesRedux);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des ecoles :", error);
      }
    };

    getEcoles();
  }, [dispatch, ecolesRedux]);

  const handleEditClick = (ecole) => {
    setSelectedEcole(ecole);
    toggleEditModal();
  };

  const handleDeleteClick = async (ecoleId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ecole ?")) {
      try {
        await axios.delete(`${ecolesApi}/${ecoleId}`);
        setEcolesList(ecoles.filter((ecole) => ecole._id !== ecoleId));
        dispatch(setEcoles(ecoles.filter((ecole) => ecole._id !== ecoleId)));
      } catch (error) {
        console.error("Erreur lors de la suppression de la ecole :", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Liste des écoles</h3>
                <Button color="primary" onClick={toggleModal}>
                  Ajouter une école
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Enfants</th>
                    <th scope="col">Performance</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {ecoles.length > 0 ? (
                    ecoles.map((ecole, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={ecole.logo || require("../../assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{ecole.nomEcole}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{ecole.emailEcole}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={ecole.statut === 'actif' ? "bg-success" : "bg-warning"} />
                            {ecole.statut}
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            {ecole?.chauffeurs?.map((chauffeur, idx) => (
                              <a
                                key={idx}
                                className="avatar avatar-sm"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={chauffeur.image}
                                />
                              </a>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{ecole.performance || 25}%</span>
                            <div>
                              <Progress
                                max="100"
                                value={ecole.performance || 25}
                                barClassName="bg-danger"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <Button
                            color="info"
                            onClick={() => handleEditClick(ecole)}
                            className="mr-2"
                          >
                            Modifier
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => handleDeleteClick(ecole._id)}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Aucune ecole disponible.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* Pagination items... */}
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      <AddEcoleModal isOpen={modalOpen} toggle={toggleModal} />
      <EditEcoleModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        ecole={selectedEcole}
        setEcolesList={setEcolesList} // Passer la fonction pour mettre à jour la liste
      />
    </>
  );
};

export default EcolesTable;
