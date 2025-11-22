import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LivroCard.css"; 

const LivroCard = ({ book, onToggleList, onEdit, onDelete }) => {
  return (
    <motion.div
  className="bookcard-container"
  style={{ position: "relative" }}
  whileHover={{ scale: 1.03 }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
>

      <Card className="shadow-sm bookcard">
        
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
          <Card.Img
            variant="top"
            className="bookcard-img"
            src={
              book.imagem ||
              "https://via.placeholder.com/300x180?text=Sem+Imagem"
            }
          />
        </motion.div>

        <Card.Body>
          <Card.Title className="fw-bold">{book.titulo}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {book.autor?.nome || "Autor desconhecido"}
          </Card.Subtitle>

          <Card.Text className="bookcard-descricao">
            {book.descricao}
          </Card.Text>

          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex gap-2">
              <Button
                size="sm"
                variant={book.isFavorito ? "danger" : "outline-danger"}
                onClick={() => onToggleList(book.id, "isFavorito")}
              >
                ❤
              </Button>

              <Button
                size="sm"
                variant={book.isQueroLer ? "warning" : "outline-warning"}
                onClick={() => onToggleList(book.id, "isQueroLer")}
              >
                📚
              </Button>

              <Button
                size="sm"
                variant={book.isCompleto ?  "success" : "outline-success"}
                onClick={() => onToggleList(book.id, "isCompleto")}
              >
                ✓
              </Button>
            </div>

            <div className="d-flex gap-2">
                <Button as={Link} to={`/livros/${book.id}`} size="sm" variant="info" data-cy={`ver-livro-btn-${book.id}`}>
                Ver
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(book.id)}
                data-cy={`editar-livro-btn-${book.id}`}
              >
                ✎
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(book.id)}
                data-cy={`excluir-livro-btn-${book.id}`}
              >
                🗑
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default LivroCard;
