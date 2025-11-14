import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  if (!token) return null; // não mostra sidebar sem login

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1b1f24",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0px 6px rgba(0,0,0,0.25)",
      }}
    >
      <h3 className="mb-4" style={{ textAlign: "center" }}>
        Biblioteca
      </h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link className="text-light" to="/">🏠 Home</Link>
        <Link className="text-light" to="/autores">✍️ Autores</Link>
        <Link className="text-light" to="/generos">📚 Gêneros</Link>
        <Link className="text-light" to="/listas">📝 Listas</Link>
        <Link className="text-light" to="/perfil">👤 Perfil</Link>
        <Link className="text-light" to="/sobre">ℹ️ Sobre</Link>
      </nav>

      <div style={{ marginTop: "auto" }}>
        <Button
          variant="danger"
          onClick={handleLogout}
          className="w-100 mt-3"
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
