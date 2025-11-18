import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { Container, Form, Card, Button } from "react-bootstrap";

const AutorForm = () => {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      api.get(`/autores/${id}`).then((res) => {
        setNome(res.data.nome);
        setDataNascimento(res.data.dataNascimento || "");
        setDescricao(res.data.descricao || "");
        setFoto(res.data.foto || "");
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { nome, dataNascimento, descricao, foto };

    if (id) {
      await api.put(`/autores/${id}`, payload);
    } else {
      await api.post(`/autores`, payload);
    }

    navigate("/autores");
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="p-4 shadow-lg form-card">

        <h3 className="text-center mb-3 form-title">
          {isEdit ? "✏️ Editar Autor" : "🖋️ Novo Autor"}
        </h3>

        {/* Preview da foto */}
        {foto && (
          <div className="text-center mb-3">
            <img
              src={foto}
              alt="Preview"
              className="form-image-preview"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label><strong>Nome</strong></Form.Label>
            <Form.Control
              name="nome"
              className="form-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Data de Nascimento</strong></Form.Label>
            <Form.Control
              name="date"
              type="date"
              className="form-input"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Descrição</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              className="form-input"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Foto (URL)</strong></Form.Label>
            <Form.Control
              name="foto"
              className="form-input"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mt-2 btn-primary">
            {isEdit ? "Salvar Alterações" : "Criar Autor"}
          </Button>

        </Form>
      </Card>
    </Container>
  );
};

export default AutorForm;
