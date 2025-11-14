import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Carrega dados do usuário logado ao iniciar
  useEffect(() => {
    if (token) {
      api
        .get("/usuarios/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, senha) => {
    const res = await api.post("/auth/login", { email, senha });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // 🔥 Função necessária para Configurações.jsx
  const updateUser = (newData) => {
    setUser((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser, // <-- ESSENCIAL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
