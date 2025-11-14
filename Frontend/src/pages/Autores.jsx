import React, { useEffect, useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const resA = await api.get("/autores");
    const resL = await api.get("/livros");

    setAutores(resA.data);
    setBooks(resL.data);
  };

  useEffect(() => { load(); }, []);

  const countBooks = (autorId) =>
    books.filter(b => b.autor?.id === autorId).length;

  const remove = async (id) => {
    if (!window.confirm("Deseja realmente excluir este autor?")) return;

    await api.delete(`/autores/${id}`);
    load();
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Autores</h3>
        <Button onClick={() => navigate("/autores/novo")}>Adicionar Autor</Button>
      </div>

      <ListGroup className="mt-3">
        {autores.map(a => (
          <ListGroup.Item key={a.id} className="d-flex justify-content-between">
            <div>
              <strong>{a.nome}</strong><br />
              <small>{a.dataNascimento || "Sem data"}</small>
              <p>{a.descricao || ""}</p>
              <small>{countBooks(a.id)} livros</small>
            </div>

            <div>
              <Button size="sm" onClick={() => navigate(`/autores/editar/${a.id}`)}>Editar</Button>{" "}
              <Button size="sm" variant="danger" onClick={() => remove(a.id)}>Excluir</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Autores;
