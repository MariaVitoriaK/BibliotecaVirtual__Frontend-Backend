// src/pages/Login.jsx
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
    <div style={{ maxWidth: 480, margin: "24px auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      <p>
        Ainda não tem conta? <Link to="/register">Registrar</Link>
      </p>
    </div>
  );
}

export default Login;
