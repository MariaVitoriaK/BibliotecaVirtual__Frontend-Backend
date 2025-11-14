// src/components/AppNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Biblioteca Virtual
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {token && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/autores">Autores</Nav.Link>
                <Nav.Link as={Link} to="/generos">Gêneros</Nav.Link>
                <Nav.Link as={Link} to="/listas">Listas</Nav.Link>
                <Nav.Link as={Link} to="/configuracoes">Configurações</Nav.Link>
                <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {!token ? (
              <Button variant="outline-light" as={Link} to="/login">
                Entrar
              </Button>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>
                Sair
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
