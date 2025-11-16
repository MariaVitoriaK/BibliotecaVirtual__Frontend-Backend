import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
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
    const payload = { titulo, descricao, imagem, autorId: autorId || null, generoId: generoId || null };
    if (isEdit) await api.put(`/livros/${id}`, payload);
    else await api.post("/livros", payload);
    nav("/");
  };

  return (
    <Container className="mt-3">
      <h3>{isEdit ? "Editar Livro" : "Adicionar Livro"}</h3>
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Título *</Form.Label>
          <Form.Control value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" value={descricao} onChange={e => setDescricao(e.target.value)} rows={10}/>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Imagem (URL)</Form.Label>
          <Form.Control value={imagem} onChange={e => setImagem(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Autor</Form.Label>
          <Form.Select value={autorId} onChange={e => setAutorId(e.target.value)}>
            <option value="">-- nenhum --</option>
            {autores.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Gênero</Form.Label>
          <Form.Select value={generoId} onChange={e => setGeneroId(e.target.value)}>
            <option value="">-- nenhum --</option>
            {generos.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="mt-2">Salvar</Button>
      </Form>
    </Container>
  );
};

export default BookForm;
