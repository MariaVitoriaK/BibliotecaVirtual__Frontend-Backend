import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BookCard = ({ book, onToggleList, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card
        className="shadow-sm"
        style={{
          width: "18rem",
          marginBottom: 20,
          borderRadius: 12,
          overflow: "hidden",
          transition: "0.3s",
          cursor: "pointer",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          style={{ overflow: "hidden" }}
        >
          <Card.Img
            variant="top"
            src={
              book.imagem ||
              "https://via.placeholder.com/300x180?text=Sem+Imagem"
            }
            style={{
              height: 340,
              width: "100%",
              objectFit: "cover",
            }}
          />
        </motion.div>

        <Card.Body>
          <Card.Title className="fw-bold">{book.titulo}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {book.autor?.nome || "Autor desconhecido"}
          </Card.Subtitle>

          <Card.Text
            style={{
              maxHeight: 50,
              overflow: "hidden",
              fontSize: 14,
            }}
          >
            {book.descricao}
          </Card.Text>

          {/* Botões */}
          <div className="d-flex justify-content-between mt-3">
            {/* Botões de listas */}
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

            {/* Ações */}
            <div className="d-flex gap-2">
              <Button as={Link} to={`/livros/${book.id}`} size="sm" variant="info">
                Ver
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(book.id)}
              >
                ✎
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(book.id)}
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

export default BookCard;
