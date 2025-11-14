// src/components/AppNavbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { FaSignOutAlt, FaHome, FaBook, FaList, FaInfoCircle } from "react-icons/fa";

function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="shadow-lg py-3"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <Container>
          {/* LOGO */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center"
            style={{ fontWeight: "700", fontSize: "1.35rem", letterSpacing: "0.5px" }}
          >
            📚 Biblioteca Virtual
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            {/* LINKS DA ESQUERDA */}
            <Nav className="me-auto">
              {token && (
                <>
                  <Nav.Link as={Link} to="/">
                    <FaHome className="me-1" /> Home
                  </Nav.Link>

                  <Nav.Link as={Link} to="/autores">
                    <FaBook className="me-1" /> Autores
                  </Nav.Link>

                  <Nav.Link as={Link} to="/generos">
                    📑 Gêneros
                  </Nav.Link>

                  <Nav.Link as={Link} to="/listas">
                    <FaList className="me-1" /> Listas
                  </Nav.Link>

                  <Nav.Link as={Link} to="/sobre">
                    <FaInfoCircle className="me-1" /> Sobre
                  </Nav.Link>
                </>
              )}
            </Nav>

            {/* DIREITA: Login / Perfil */}
            <Nav>
              {!token ? (
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  className="px-4"
                >
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
                        width="36"
                        height="36"
                        style={{ objectFit: "cover", marginRight: 8 }}
                      />
                      <strong>{user?.nome?.split(" ")[0] || "Usuário"}</strong>
                    </span>
                  }
                >
                  <NavDropdown.Item as={Link} to="/perfil">
                    <FaUserCircle className="me-2" />
                    Meu Perfil
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    onClick={handleLogout}
                    className="text-danger"
                    style={{ fontWeight: "600" }}
                  >
                    <FaSignOutAlt className="me-2" />
                    Sair
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default AppNavbar;
