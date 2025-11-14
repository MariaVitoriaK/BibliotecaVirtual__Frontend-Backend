// src/pages/PerfilUsuario.jsx
import React, { useContext } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "22rem" }} className="p-3 shadow">
        <div className="text-center">
          <img
            src={user?.foto || "https://via.placeholder.com/150"}
            alt="Foto de perfil"
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 20,
            }}
          />
        </div>

        <h4 className="text-center">{user?.nome}</h4>
        <p className="text-center text-muted">{user?.email}</p>

        <Button
          variant="primary"
          className="mt-3"
          onClick={() => navigate("/configuracoes/editar")}
        >
          Atualizar Informações
        </Button>
      </Card>
    </Container>
  );
};

export default PerfilUsuario;
