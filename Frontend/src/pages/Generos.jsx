import React, { useEffect, useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Generos = () => {
  const [generos, setGeneros] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get("/generos");
      setGeneros(res.data);
    } catch (err) {
      console.error("Erro ao carregar gêneros:", err);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Deseja realmente excluir este gênero?")) return;

    try {
      await api.delete(`/generos/${id}`);
      load();
    } catch (err) {
      console.error("Erro ao excluir gênero:", err);
      alert("Erro ao excluir gênero");
    }
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Gêneros</h3>
        <Button onClick={() => navigate("/generos/novo")}>Adicionar Gênero</Button>
      </div>

      <ListGroup className="mt-3">
        {generos.map(g => (
          <ListGroup.Item
            key={g.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{g.nome}</strong>
              <div>
                <small>
                  {g.livros?.length ? `${g.livros.length} livros` : "0 livros"}
                </small>
              </div>
            </div>

            <div>
              <Button size="sm" onClick={() => navigate(`/generos/editar/${g.id}`)}>
                Editar
              </Button>{" "}
              <Button size="sm" variant="danger" onClick={() => remove(g.id)}>
                Excluir
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Generos;
