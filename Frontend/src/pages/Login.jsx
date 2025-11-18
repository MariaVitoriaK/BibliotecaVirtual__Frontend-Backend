import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/", { replace: true });
        } else {
          alert("Token não retornado pela API.");
        }
      } else {
        alert(data.message || "Erro no login");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com a API");
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-4 shadow form-card">
        <h2 className="text-center form-title mb-4">Entrar</h2>

        <form onSubmit={handleLogin}>
          <input
            className="form-control form-input mb-3"
            name="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control form-input mb-4"
            name="password"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100" type="submit">
            Entrar
          </button>
        </form>

        <p className="text-center mt-3">
          Ainda não tem conta? <Link to="/register">Registrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
