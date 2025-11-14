import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const SimpleCard = ({ book, onToggle, onView }) => (
  <div style={{ border: "1px solid #ddd", padding: 8, margin: 8, width: 180 }}>
    <img src={book.imagem || "https://via.placeholder.com/160x100"} alt="" style={{ width: "100%", height: 100, objectFit: "cover" }} />
    <div style={{ marginTop: 6 }}><strong>{book.titulo}</strong></div>
    <div className="mt-2">
      <Button size="sm" onClick={() => onToggle(book.id, "isFavorito")}>❤</Button>{' '}
      <Button size="sm" onClick={() => onToggle(book.id, "isQueroLer")}>↺</Button>{' '}
      <Button size="sm" onClick={() => onToggle(book.id, "isCompleto")}>✓</Button>{' '}
      <Button size="sm" variant="info" onClick={() => onView(book.id)}>Ver</Button>
    </div>
  </div>
);

const Listas = () => {
  const [books, setBooks] = useState([]);
  const nav = useNavigate();

  const load = async () => {
    const res = await api.get("/livros");
    setBooks(res.data);
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id, field) => {
    const b = books.find(x => x.id === id);
    const res = await api.put(`/livros/${id}`, { [field]: !b[field] });
    setBooks(bs => bs.map(x => x.id === id ? res.data : x));
  };

  const view = (id) => nav(`/livros/${id}`);

  const favoritos = books.filter(b => b.isFavorito);
  const quero = books.filter(b => b.isQueroLer);
  const completos = books.filter(b => b.isCompleto);

  return (
    <Container className="mt-3">
      <h3>Listas</h3>
      <h5>Favoritos</h5>
      <Row>
        {favoritos.length === 0 && <p>Nenhum favorito</p>}
        {favoritos.map(b => <Col key={b.id}><SimpleCard book={b} onToggle={toggle} onView={view} /></Col>)}
      </Row>

      <h5 className="mt-3">Quero Ler</h5>
      <Row>
        {quero.length === 0 && <p>Nenhum</p>}
        {quero.map(b => <Col key={b.id}><SimpleCard book={b} onToggle={toggle} onView={view} /></Col>)}
      </Row>

      <h5 className="mt-3">Completos</h5>
      <Row>
        {completos.length === 0 && <p>Nenhum</p>}
        {completos.map(b => <Col key={b.id}><SimpleCard book={b} onToggle={toggle} onView={view} /></Col>)}
      </Row>
    </Container>
  );
};

export default Listas;
