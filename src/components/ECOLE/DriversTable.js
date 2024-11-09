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
import { driversApi } from "utils/apis";
import { setDrivers } from "reducer/driversSlice";

const DriversTable = () => {
  const driversRedux = useSelector((state) => state.drivers.driversData);
  const [drivers, setDriversList] = useState([]);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);


   
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const response = await axios.get(driversApi);
        const data = response.data;

        if (data && data.length > 0) {
          dispatch(setDrivers(data));
          setDriversList(data);
        } else {
          setDriversList(driversRedux);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des drivers :", error);
      }
    };

    getDrivers();
  }, [dispatch, driversRedux]);

  const handleEditClick = (driver) => {
    setSelectedDriver(driver);
    toggleEditModal();
  };

  const handleDeleteClick = async (driverId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet chauffeur ?")) {
      try {
        await axios.delete(`${driversApi}/${driverId}`);
        setDriversList(drivers.filter((driver) => driver._id !== driverId));
        dispatch(setDrivers(drivers.filter((driver) => driver._id !== driverId)));

      } catch (error) {
        console.error("Erreur lors de la suppression du chauffeur :", error);
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
                  Ajouter un chauffeur
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
                  {drivers.length > 0 ? (
                    drivers.map((driver, index) => (
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
                                src={driver.logo || require("../../assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{driver.nomDriver}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{driver.emailDriver}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={driver.statut === 'actif' ? "bg-success" : "bg-warning"} />
                            {driver.statut}
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            {driver?.chauffeurs?.map((chauffeur, idx) => (
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
                            <span className="mr-2">{driver.performance || 25}%</span>
                            <div>
                              <Progress
                                max="100"
                                value={driver.performance || 25}
                                barClassName="bg-danger"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <Button
                            color="info"
                            onClick={() => handleEditClick(driver)}
                            className="mr-2"
                          >
                            Modifier
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => handleDeleteClick(driver._id)}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Aucune driver disponible.
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

     
    </>
  );
};

export default DriversTable;
