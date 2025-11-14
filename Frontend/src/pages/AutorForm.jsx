import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const AutorForm = () => {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(""); // novo estado

  const navigate = useNavigate();
  const { id } = useParams();

  // CARREGAR AUTOR PARA EDIÇÃO
  useEffect(() => {
    if (id) {
      api.get(`/autores/${id}`).then((res) => {
        setNome(res.data.nome);
        setDataNascimento(res.data.dataNascimento || "");
        setDescricao(res.data.descricao || "");
        setFoto(res.data.foto || ""); // carregar foto
      });
    }
  }, [id]);

  // ENVIAR FORMULÁRIO
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome,
      dataNascimento,
      descricao,
      foto 
    };

    if (id) {
      await api.put(`/autores/${id}`, payload);
    } else {
      await api.post(`/autores`, payload);
    }

    navigate("/autores");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Autor" : "Novo Autor"}</h2>

      <form onSubmit={handleSubmit} className="mt-3">

        {/* NOME */}
        <div className="mb-3">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        {/* DATA DE NASCIMENTO */}
        <div className="mb-3">
          <label>Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>

        {/* DESCRIÇÃO */}
        <div className="mb-3">
          <label>Descrição</label>
          <textarea
            className="form-control"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>
        {/* FOTO */}
        <div className="mb-3">
          <label>Foto (URL)</label>
          <input
            type="text"
            className="form-control"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          {id ? "Salvar Alterações" : "Criar Autor"}
        </button>
      </form>
    </div>
  );
};

export default AutorForm;
