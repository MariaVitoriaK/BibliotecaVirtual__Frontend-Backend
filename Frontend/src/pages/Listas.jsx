import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const SimpleCard = ({ book, onToggle, onView }) => (
  <div className="book-card">
    <img src={book.imagem || "https://via.placeholder.com/160x100"} alt={book.titulo} />
    <div className="book-card-body">
      <strong>{book.titulo}</strong>
      <div className="book-card-buttons">
        <Button size="sm" variant={book.isFavorito ? "danger" : "outline-danger"} onClick={() => onToggle(book.id, "isFavorito")}>❤</Button>
        <Button size="sm" variant={book.isQueroLer ? "warning" : "outline-warning"} onClick={() => onToggle(book.id, "isQueroLer")}>↺</Button>
        <Button size="sm" variant={book.isCompleto ? "success" : "outline-success"} onClick={() => onToggle(book.id, "isCompleto")}>✓</Button>
        <Button size="sm" variant="info" onClick={() => onView(book.id)}>Ver</Button>
      </div>
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

      <h5 className="list-section">Favoritos</h5>
      {favoritos.length === 0 && <p>Nenhum favorito</p>}
      <div className="horizontal-list">
        {favoritos.map(b => (
          <SimpleCard 
            key={b.id} 
            book={b} 
            onToggle={toggle} 
            onView={view} 
          />
        ))}
      </div>

     <h5 className="list-section">Quero Ler</h5>
      {quero.length === 0 && <p>Nenhum</p>}
      <div className="horizontal-list">
        {quero.map(b => (
          <SimpleCard 
            key={b.id} 
            book={b} 
            onToggle={toggle} 
            onView={view} 
          />
        ))}
      </div>

     <h5 className="list-section">Completos</h5>
      {completos.length === 0 && <p>Nenhum</p>}
      <div className="horizontal-list">
        {completos.map(b => (
          <SimpleCard 
            key={b.id} 
            book={b} 
            onToggle={toggle} 
            onView={view} 
          />
        ))}
      </div>

    </Container>
  );
};

export default Listas;
