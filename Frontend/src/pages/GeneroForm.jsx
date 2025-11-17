import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const GeneroForm = () => {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/generos/${id}`).then((res) => {
        setNome(res.data.nome);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await api.put(`/generos/${id}`, { nome });
    } else {
      await api.post("/generos", { nome });
    }

    navigate("/generos");
  };

  return (
    <div>
      <h2>{id ? "Editar Gênero" : "Novo Gênero"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          type="text"
          placeholder="Nome do Gênero"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <button type="submit">
          {id ? "Salvar Alterações" : "Criar Gênero"}
        </button>
      </form>
    </div>
  );
};

export default GeneroForm;
