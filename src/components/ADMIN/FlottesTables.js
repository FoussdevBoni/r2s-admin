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
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { flottesApi } from "utils/apis";
import { setFlottes } from "reducer/flottesSlice";
import AddFlotteModal from "./NewFlotte"; // Pour ajouter une flotte
import EditFlotteModal from "./EditFlotte"; // Pour modifier une flotte
import { auth } from "../../firebase/firebaseConfig";

const FlottesTable = () => {
  const flottesRedux = useSelector((state) => state.flottes.flottesData);
  const [flottes, setFlottesList] = useState([]);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFlotte, setSelectedFlotte] = useState(null);


   
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    const getFlottes = async () => {
      try {
        const response = await axios.get(flottesApi);
        const data = response.data;

        if (data && data.length > 0) {
          dispatch(setFlottes(data));
          setFlottesList(data);
        } else {
          setFlottesList(flottesRedux);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des flottes :", error);
      }
    };

    getFlottes();
  }, [dispatch, flottesRedux]);

  const handleEditClick = (flotte) => {
    setSelectedFlotte(flotte);
    toggleEditModal();
  };

  const handleDeleteClick = async (flotteId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette flotte ?")) {
      try {
        await axios.delete(`${flottesApi}/${flotteId}`);
        setFlottesList(flottes.filter((flotte) => flotte._id !== flotteId));
        dispatch(setFlottes(flottes.filter((flotte) => flotte._id !== flotteId)));
      } catch (error) {
        console.error("Erreur lors de la suppression de la flotte :", error);
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
                <h3 className="mb-0">Liste des flottes</h3>
                <Button color="primary" onClick={toggleModal}>
                  Ajouter une flotte
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Chauffeur</th>
                    <th scope="col">Performance</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {flottes.length > 0 ? (
                    flottes.map((flotte, index) => (
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
                                src={flotte.managerPhoto || require("../../assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{flotte.companyName}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{flotte.email}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={flotte.statut === 'actif' ? "bg-success" : "bg-warning"} />
                            {flotte.statut}
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            {flotte.chauffeurs.map((chauffeur, idx) => (
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
                            <span className="mr-2">{flotte.performance || 25}%</span>
                            <div>
                              <Progress
                                max="100"
                                value={flotte.performance || 25}
                                barClassName="bg-danger"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <Button
                            color="info"
                            onClick={() => handleEditClick(flotte)}
                            className="mr-2"
                          >
                            Modifier
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => handleDeleteClick(flotte._id)}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Aucune flotte disponible.
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

      <AddFlotteModal isOpen={modalOpen} toggle={toggleModal} />
      <EditFlotteModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        flotte={selectedFlotte}
        setFlottesList={setFlottesList} // Passer la fonction pour mettre à jour la liste
      />
    </>
  );
};

export default FlottesTable;
