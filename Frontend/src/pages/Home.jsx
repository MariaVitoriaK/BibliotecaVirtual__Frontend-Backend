import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "../api/api";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Form } from "react-bootstrap";
import { Pagination } from "react-bootstrap";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  useEffect(() => {
    load();
  }, [token]);

  const load = async () => {
    const res = await api.get("/livros");
    setBooks(res.data);
  };

  // 🔥 Agora vem ANTES da paginação
  const filteredBooks = books.filter(book =>
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔥 Paginação agora usa filteredBooks sem causar erro
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const toggle = async (id, field) => {
    const book = books.find(b => b.id === id);
    const payload = { [field]: !book[field] };

    await api.put(`/livros/${id}`, payload);

    setBooks(bs =>
      bs.map(b =>
        b.id === id ? { ...b, ...payload } : b
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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reseta paginação quando busca
          }}
        />
      </Form>

      <Row>
        {currentBooks.length === 0 && <p>Nenhum livro encontrado, recomendado criar Autor e Gênero primeiro.</p>}

        {currentBooks.map(book => (
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

      {/* paginação */}
      <div className="d-flex justify-content-center my-4">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />

          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default Home;
