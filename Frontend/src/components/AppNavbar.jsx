// src/components/AppNavbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown, Image } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: "600", fontSize: "1.3rem" }}
        >
          📚 Biblioteca Virtual
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {token && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/autores">Autores</Nav.Link>
                <Nav.Link as={Link} to="/generos">Gêneros</Nav.Link>
                <Nav.Link as={Link} to="/listas">Listas</Nav.Link>
                <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
              </>
            )}
          </Nav>

          {/* DIREITA DA NAVBAR */}
          <Nav>
            {!token ? (
              <Button variant="outline-light" as={Link} to="/login">
                Entrar
              </Button>
            ) : (
              <NavDropdown
                align="end"
                title={
                  <span className="d-flex align-items-center">
                    <Image
                      src={user?.foto || "https://via.placeholder.com/40"}
                      roundedCircle
                      width="35"
                      height="35"
                      style={{ objectFit: "cover", marginRight: 8 }}
                    />
                    {user?.nome?.split(" ")[0] || "Usuário"}
                  </span>
                }
              >
                <NavDropdown.Item as={Link} to="/perfil">
                  Meu Perfil
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
