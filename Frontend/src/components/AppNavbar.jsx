import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown, Image } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaBook, FaList, FaInfoCircle, FaUserCircle, FaSignOutAlt, FaAddressBook, FaAddressCard, FaArchive, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import "../App.css"; 

export default function AppNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navbar expand="lg" className="app-navbar py-2" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
            📚 Biblioteca Virtual
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              {token && (
                <>
                  <Nav.Link as={Link} to="/"><FaHome className="me-1" /> Home</Nav.Link>
                  <Nav.Link as={Link} to="/autores"><FaBook className="me-1" /> Autores</Nav.Link>
                  <Nav.Link as={Link} to="/generos"><FaBookOpen className="me-1" />Gêneros</Nav.Link>
                  <Nav.Link as={Link} to="/listas"><FaList className="me-1" /> Listas</Nav.Link>
                  <Nav.Link as={Link} to="/sobre"><FaInfoCircle className="me-1" /> Sobre</Nav.Link>
                </>
              )}
            </Nav>

            <Nav>
              {!token ? (
                <Button as={Link} to="/login" variant="outline-light" className="px-4">
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
                        width={36}
                        height={36}
                        className="user-img me-2"
                        style={{ objectFit: "cover" }}
                      />
                      {user?.nome?.split(" ")[0] || "Usuário"}
                    </span>
                  }
                  className="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/perfil">
                    <FaUserCircle className="me-2" /> Meu Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} className="text-danger">
                    <FaSignOutAlt className="me-2" /> Sair
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
