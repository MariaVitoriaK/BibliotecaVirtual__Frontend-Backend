import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book, onToggleList, onEdit, onDelete }) => {
  return (
    <Card style={{ width: "18rem", marginBottom: 16 }}>
      <Card.Img variant="top" src={book.imagem || "https://via.placeholder.com/300x180?text=Sem+Imagem"} style={{ height: 180, objectFit: "cover" }} />
      <Card.Body>
        <Card.Title>{book.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.autor?.nome || "Autor desconhecido"}</Card.Subtitle>
        <Card.Text style={{ maxHeight: 48, overflow: "hidden" }}>{book.descricao}</Card.Text>

        <div className="d-flex justify-content-between">
          <div>
            <Button size="sm" variant={book.isFavorito ? "warning" : "outline-warning"} onClick={() => onToggleList(book.id, "isFavorito")}>❤</Button>{' '}
            <Button size="sm" variant={book.isQueroLer ? "success" : "outline-success"} onClick={() => onToggleList(book.id, "isQueroLer")}>📚</Button>{' '}
            <Button size="sm" variant={book.isCompleto ? "primary" : "outline-primary"} onClick={() => onToggleList(book.id, "isCompleto")}>✓</Button>
          </div>
          <div>
            <Button as={Link} to={`/livros/${book.id}`} size="sm" variant="info">Ver</Button>{' '}
            <Button size="sm" variant="secondary" onClick={() => onEdit(book.id)}>✎</Button>{' '}
            <Button size="sm" variant="danger" onClick={() => onDelete(book.id)}>🗑</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
