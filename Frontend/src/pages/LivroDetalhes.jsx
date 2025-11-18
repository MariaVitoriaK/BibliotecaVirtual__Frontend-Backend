import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { Container, Button } from "react-bootstrap";


const LivroDetalhes = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/livros/${id}`).then((r) => setLivro(r.data));
  }, [id]);

  const atualizarCampo = async (campo) => {
    const novoValor = { [campo]: !livro[campo] };
    await api.put(`/livros/${id}`, novoValor);
    setLivro({ ...livro, ...novoValor });
  };

  const excluirLivro = async () => {
    if (!confirm("Tem certeza que deseja excluir este livro?")) return;
    await api.delete(`/livros/${id}`);
    navigate("/");
  };

  if (!livro) return <p>Carregando...</p>;

  return (
    <Container className="mt-4">
      <div className="livro-detalhes-card">

        <h2 className="mb-3">{livro.titulo}</h2>

        {livro.imagem && (
          <img
            src={livro.imagem}
            alt={livro.titulo}
            className="livro-detalhes-img"
          />
        )}

        <div className="livro-info">
          <p><strong>Autor:</strong> {livro.autor?.nome || "Sem autor"}</p>
          <p><strong>Gênero:</strong> {livro.genero?.nome || "Sem gênero"}</p>

          <p className="mt-3"><strong>Descrição:</strong></p>
          <p>{livro.descricao || "Sem descrição"}</p>
        </div>

        <div className="livro-botoes">

          <Button
            variant={livro.isFavorito ? "danger" : "outline-danger"}
            onClick={() => atualizarCampo("isFavorito")}
          >
            ❤ Favorito
          </Button>

          <Button
            variant={livro.isQueroLer ? "warning" : "outline-warning"}
            onClick={() => atualizarCampo("isQueroLer")}
          >
            📚 Quero Ler
          </Button>

          <Button
            variant={livro.isCompleto ? "success" : "outline-success"}
            onClick={() => atualizarCampo("isCompleto")}
          >
            ✓ Completo
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate(`/livros/${livro.id}/editar`)}
          >
            ✎ Editar
          </Button>

          <Button variant="danger" onClick={excluirLivro}>
            🗑 Excluir
          </Button>

          <Button variant="dark" onClick={() => navigate("/")}>
            ⬅ Voltar
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LivroDetalhes;
