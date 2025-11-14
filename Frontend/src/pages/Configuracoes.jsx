import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Configuracoes = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [foto, setFoto] = useState(user?.foto || "");

  const save = async () => {
    await api.put("/usuarios/me", { nome, email, foto });
    updateUser({ nome, email, foto });
    alert("Atualizado");
  };

  return (
    <Container className="mt-3">
      <h3>Configurações</h3>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Nome</Form.Label>
          <Form.Control value={nome} onChange={e => setNome(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Foto (URL)</Form.Label>
          <Form.Control value={foto} onChange={e => setFoto(e.target.value)} />
        </Form.Group>
        <Button onClick={save}>Salvar</Button>
      </Form>
    </Container>
  );
};

export default Configuracoes;
