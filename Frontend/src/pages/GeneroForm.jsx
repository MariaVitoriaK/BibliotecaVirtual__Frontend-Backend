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
    <div className="d-flex justify-content-center mt-4">
      <div className="card p-4 shadow form-card">
        <h2 className="text-center mb-3 form-title">
          {id ? "Editar Gênero" : "Novo Gênero"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fw-semibold">Nome do Gênero</label>
            <input
              name="nome"
              type="text"
              placeholder="Digite o nome do gênero"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="form-control form-input"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            {id ? "Salvar Alterações" : "Criar Gênero"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneroForm;
