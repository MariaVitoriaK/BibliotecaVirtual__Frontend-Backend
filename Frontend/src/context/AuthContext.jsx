import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await api.get("/usuarios/me");
          setUser(res.data);
        } catch (err) {
          console.error("Erro ao carregar usuário:", err);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, senha) => {
    const res = await api.post("/auth/login", { email, senha });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

    const userRes = await api.get("/usuarios/me");
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateUser = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
