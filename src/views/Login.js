import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import getData from "functions/backend/getData";
import { adminApi, flottesApi, ecolesApi } from "utils/apis"; 
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "reducer/userSlice";
import axios from "axios";
import { loginApi } from "utils/apis";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  

  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(loginApi , form)
      const data = response.data.user
      const {role , _id } = data
      console.log(data)
      if (role==='admin') {
          dispatch(setUser(data))
          console.log(data)
       
      } else if (role==='flotte') {
          getData(flottesApi+'/user/'+_id , (data)=>{
          dispatch(setUser(data))
        } , (error)=>{
          alert("Une erreur s'est produite lors de la connexion")
        })
      } else if (role==='ecole') {
          getData(ecolesApi+'/user/'+_id , (data)=>{
          dispatch(setUser(data))
        } , (error)=>{
          alert("Une erreur s'est produite lors de la connexion")
        })
      }
    } catch (error) {
       console.log(error)
       setLoading(false)
       setError(error.response.data.error)
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card className="shadow-lg p-4 rounded-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Connexion</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Entrez votre email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    value={form.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" size="lg" disabled={loading || form.email==='' || form.password===''}>
                  {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Se connecter"}
                </Button>

                <div className="text-center mt-3">
                  <a href="/forgot-password" className="text-muted">
                    Mot de passe oublié ?
                  </a>
                </div>

                <div className="text-center mt-3">
                  <span className="text-muted">Pas encore de compte ? </span>
                  <a href="/register" className="text-primary">
                    Inscrivez-vous
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
