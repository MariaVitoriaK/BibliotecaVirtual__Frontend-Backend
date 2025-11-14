import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "../api/api";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Form } from "react-bootstrap";


const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book =>
  book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const load = async () => {
    const res = await api.get("/livros");
    setBooks(res.data);
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const toggle = async (id, field) => {
    const book = books.find(b => b.id === id);
    const payload = { [field]: !book[field] };

    await api.put(`/livros/${id}`, payload);

    // Corrigido → apenas altera o campo, não substitui o livro
    setBooks(bs =>
      bs.map(b =>
        b.id === id
          ? { ...b, ...payload } // mantém autor, gênero e tudo mais
          : b
      )
    );
  };

  const remove = async (id) => {
    await api.delete(`/livros/${id}`);
    setBooks(bs => bs.filter(b => b.id !== id));
  };

  const edit = (id) => navigate(`/livros/${id}/editar`);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h3>Meus Livros</h3>
        <Button onClick={() => navigate("/livros/novo")}>Adicionar Livro</Button>
      </div>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Pesquisar livros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </Form>

      <Row>
        {books.length === 0 && <p>Nenhum livro ainda. Crie autor/gênero se quiser ou adicione um livro.</p>}
        {filteredBooks.map(book => (
          <Col key={book.id} xs={12} md={6} lg={4}>
            <BookCard
              book={book}
              onToggleList={toggle}
              onDelete={remove}
              onEdit={edit}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
