import React, { useContext } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <p>Carregando...</p>;

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="p-3 shadow" style={{ width: 22 + "rem" }}>
        <div className="text-center">
          <img
            src={user.foto || "https://via.placeholder.com/150"}
            alt="Foto de perfil"
            style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", marginBottom: 15 }}
          />
        </div>

        <h4 className="text-center">{user.nome}</h4>
        <p className="text-center text-muted">{user.email}</p>

        <Button
          variant="primary"
          className="mt-3 w-100"
          onClick={() => navigate("/configuracoes")}
        >
          Atualizar Informações
        </Button>
      </Card>
    </Container>
  );
}
