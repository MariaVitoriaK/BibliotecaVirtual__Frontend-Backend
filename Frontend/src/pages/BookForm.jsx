import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const BookForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [autorId, setAutorId] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.get("/autores").then(r => setAutores(r.data));
    api.get("/generos").then(r => setGeneros(r.data));

    if (isEdit) {
      api.get(`/livros/${id}`).then(r => {
        setTitulo(r.data.titulo);
        setDescricao(r.data.descricao || "");
        setImagem(r.data.imagem || "");
        setAutorId(r.data.autor?.id || "");
        setGeneroId(r.data.genero?.id || "");
      });
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      titulo,
      descricao,
      imagem,
      autorId: autorId || null,
      generoId: generoId || null
    };

    if (isEdit) await api.put(`/livros/${id}`, payload);
    else await api.post("/livros", payload);

    nav("/");
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="p-4 shadow-lg form-card">
        <h3 className="text-center mb-3 form-title">
          {isEdit ? "✏️ Editar Livro" : "📚 Adicionar Livro"}
        </h3>

        {imagem && (
          <div className="text-center mb-3">
            <img
              src={imagem}
              alt="Prévia"
              className="form-image-preview"
              onError={(e) => e.target.style.display = "none"}
            />
          </div>
        )}

        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Título *</strong></Form.Label>
            <Form.Control
              className="form-input"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Descrição</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              className="form-input"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Imagem (URL)</strong></Form.Label>
            <Form.Control
              className="form-input"
              value={imagem}
              onChange={e => setImagem(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Autor</strong></Form.Label>
            <Form.Select
              className="form-input"
              value={autorId}
              onChange={e => setAutorId(e.target.value)}
            >
              <option value="">-- nenhum --</option>
              {autores.map(a => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Gênero</strong></Form.Label>
            <Form.Select
              className="form-input"
              value={generoId}
              onChange={e => setGeneroId(e.target.value)}
            >
              <option value="">-- nenhum --</option>
              {generos.map(g => (
                <option key={g.id} value={g.id}>{g.nome}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="w-100 mt-3 btn-primary">
            {isEdit ? "Salvar Alterações" : "Adicionar Livro"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default BookForm;
