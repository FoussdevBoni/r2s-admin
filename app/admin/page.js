"use client"

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from 'firebase/auth';
import getData from "@/functions/backend/getData";
import { adminApi, flottesApi, ecolesApi } from "@/utils/apis"; 
import { auth } from "@/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "@/reducer/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  

  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

                <Button variant="primary" type="submit" className="w-100" size="lg" disabled={loading}>
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
