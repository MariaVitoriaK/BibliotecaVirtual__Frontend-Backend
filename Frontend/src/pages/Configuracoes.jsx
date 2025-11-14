import React, { useContext, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Configuracoes() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setFoto(user.foto || "");
    }
  }, [user]);

  const save = async () => {
    try {
      const res = await api.put("/usuarios", { nome, foto });
      updateUser(res.data);
      alert("Informações atualizadas!");
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar informações.");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: 500 }}>
      <h3>Editar Perfil</h3>

      <Form className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control value={nome} onChange={e => setNome(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Foto (URL)</Form.Label>
          <Form.Control value={foto} onChange={e => setFoto(e.target.value)} />
        </Form.Group>

        <Button variant="primary" className="w-100" onClick={save}>
          Salvar
        </Button>
      </Form>
    </Container>
  );
}
