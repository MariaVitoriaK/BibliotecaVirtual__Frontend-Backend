import React, { useEffect, useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const navigate = useNavigate(); // nome "navigate" é mais claro

  const load = async () => {
    try {
      const res = await api.get("/autores");
      setAutores(res.data);
    } catch (err) {
      console.error("Erro ao carregar autores:", err);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Deseja realmente excluir este autor?")) return;
    try {
      await api.delete(`/autores/${id}`);
      load();
    } catch (err) {
      console.error("Erro ao excluir autor:", err);
      alert("Erro ao excluir autor");
    }
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Autores</h3>
        <Button onClick={() => navigate("/autores/novo")}>Adicionar Autor</Button>
      </div>

      <ListGroup className="mt-3">
        {autores.map(a => (
          <ListGroup.Item key={a.id} className="d-flex justify-content-between align-items-start">
            <div>
              <strong>{a.nome}</strong><br />
              <small>{a.dataNascimento || ""}</small>
              <p>{a.descricao}</p>
            </div>
            <div>
              <Button size="sm" onClick={() => navigate(`/autores/editar/${a.id}`)}>Editar</Button>{' '}
              <Button size="sm" variant="danger" onClick={() => remove(a.id)}>Excluir</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Autores;
