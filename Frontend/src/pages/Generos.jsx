import React, { useEffect, useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Generos = () => {
  const [generos, setGeneros] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const resG = await api.get("/generos");
    const resL = await api.get("/livros");

    setGeneros(resG.data);
    setBooks(resL.data);
  };

  useEffect(() => { load(); }, []);

  const countBooks = (generoId) => {
    return books.filter(b => b.genero?.id === generoId).length;
  };

  const remove = async (id) => {
    if (!window.confirm("Deseja realmente excluir este gênero?")) return;

    await api.delete(`/generos/${id}`);
    load();
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Gêneros</h3>
        <Button onClick={() => navigate("/generos/novo")}>Adicionar Gênero</Button>
      </div>

      <ListGroup className="mt-3">
       {generos.map(g => (
          <ListGroup.Item key={g.id} className="genero-card">
           <div className="genero-info">
             <strong>{g.nome}</strong>
             <div>
              <small>{countBooks(g.id)} livros</small>
             </div>
           </div>

      <div className="genero-buttons">
        <Button  data-cy={`editar-genero-btn-${g.id}`} size="sm" onClick={() => navigate(`/generos/editar/${g.id}`)}>Editar</Button>
        <Button data-cy={`excluir-genero-btn-${g.id}`}  size="sm" variant="danger" onClick={() => remove(g.id)}>Excluir</Button>
      </div>
    </ListGroup.Item>
  ))}
</ListGroup>
    </Container>
  );
};

export default Generos;
