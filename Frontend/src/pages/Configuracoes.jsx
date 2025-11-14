import React, { useContext, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Configuracoes = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");

  // ✔️ Preencher inputs quando o usuário for carregado pelo contexto
  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setEmail(user.email || "");
      setFoto(user.foto || "");
    }
  }, [user]);

  const save = async () => {
    try {
      const res = await api.put("/usuarios/me", { nome, email, foto });

      updateUser(res.data); // atualiza contexto

      alert("Informações atualizadas!");
      navigate("/perfil");

    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar");
    }
  };

  return (
    <Container className="mt-3">
      <h3>Editar Informações</h3>

      <Form className="mt-3">
        <Form.Group className="mb-2">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Foto (URL)</Form.Label>
          <Form.Control
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-3" onClick={save}>
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

export default Configuracoes;
