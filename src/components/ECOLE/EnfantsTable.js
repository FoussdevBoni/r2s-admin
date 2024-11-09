import {
  Badge,
  Card,
  CardHeader,
  CardFooter,

  Media,
  Pagination,
 
  Progress,
  Table,
  Container,
  Row,
  Button,
 
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enfantsApi } from "utils/apis";
import { setEnfants } from "reducer/enfantsSlice";
import AddEnfantModal from "./NewEnfant"; // 
import EditEnfantModal from "./EditEnfant"; 
import EnfantDetails from "./EnfantDetails";

const EnfantsTable = () => {
  const enfantsRedux = useSelector((state) => state.enfants.enfantsData);
  const [enfants, setEnfantsList] = useState([]);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEnfant, setSelectedEnfant] = useState(null);


   
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    const getEnfants = async () => {
      try {
        const response = await axios.get(enfantsApi);

        const data = response.data;
         console.log(data)
        if (data && data.length > 0) {
          dispatch(setEnfants(data));
          setEnfantsList(data);
        } else {
          setEnfantsList(enfantsRedux);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des enfants :", error);
      }
    };

    getEnfants();
  }, [dispatch, enfantsRedux]);

  const handleEditClick = (enfant) => {
    setSelectedEnfant(enfant);
    toggleEditModal();
  };

  const handleDeleteClick = async (enfantId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet chauffeur ?")) {
      try {
        await axios.delete(`${enfantsApi}/${enfantId}`);
        setEnfantsList(enfants.filter((enfant) => enfant._id !== enfantId));
        dispatch(setEnfants(enfants.filter((enfant) => enfant._id !== enfantId)));

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
                <h3 className="mb-0">Liste des enfants</h3>
                <Button color="primary" onClick={toggleModal}>
                  Ajouter un enfant
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Tel</th>
                    <th scope="col">Chauffeur</th>
                    <th scope="col">Abonnement</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {enfants.length > 0 ? (
                    enfants.map((enfant, index) => (
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
                                src={enfant.photo || require("../../assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{enfant.lastName} {enfant.firstName}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{enfant.phoneNumber}</td>
                        
                          {
                            enfant.chauffeur ?  <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={enfant.photo || require("../../assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{enfant.lastName} {enfant.firstName}</span>
                            </Media>
                          </Media>
                        </th>: <td>
                            Pas de chauffeur
                        </td>
                          }
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{enfant.performance || 25}%</span>
                            <div>
                              <Progress
                                max="100"
                                value={enfant.performance || 25}
                                barClassName="bg-danger"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <Button
                            color="info"
                            onClick={() => handleEditClick(enfant)}
                            className="mr-2"
                          >
                            Detaills
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => handleDeleteClick(enfant._id)}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Aucune enfant disponible.
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

      <AddEnfantModal isOpen={modalOpen} toggle={toggleModal} />
      <EnfantDetails
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        enfant={selectedEnfant}
        setEnfantsList={setEnfantsList}
      />
    </>
  );
};

export default EnfantsTable;
