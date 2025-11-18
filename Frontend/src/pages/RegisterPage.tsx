import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, username, email, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Usuário criado com sucesso!");
      navigate("/login");
    } else {
      alert(data.message || "Erro ao registrar");
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-4 shadow form-card">
        <h2 className="text-center form-title mb-4">Criar Conta</h2>

        <form onSubmit={handleRegister}>
          <input
            name="nome"
            className="form-control form-input mb-3"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            name="username"
            className="form-control form-input mb-3"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            name="email"
            className="form-control form-input mb-3"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            name="password"
            className="form-control form-input mb-4"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100" type="submit">
            Registrar
          </button>
        </form>

        <p className="text-center mt-3">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
