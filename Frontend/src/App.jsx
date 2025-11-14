import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppNavbar from "./components/AppNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookForm from "./pages/BookForm";
import Autores from "./pages/Autores";
import Generos from "./pages/Generos";
import Listas from "./pages/Listas";
import Configuracoes from "./pages/Configuracoes";
import Sobre from "./pages/Sobre";
import AutorForm from "./pages/AutorForm";
import GeneroForm from "./pages/GeneroForm";
import RegisterPage from "./pages/RegisterPage";
import PerfilUsuario from "./pages/PerfilUsuario";
import "bootstrap/dist/css/bootstrap.min.css";

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/livros/novo" element={<ProtectedRoute><BookForm/></ProtectedRoute>} />
          <Route path="/livros/:id/editar" element={<ProtectedRoute><BookForm/></ProtectedRoute>} />
          <Route path="/autores/*" element={<ProtectedRoute><Autores/></ProtectedRoute>} />
          <Route path="/generos/*" element={<ProtectedRoute><Generos/></ProtectedRoute>} />
          <Route path="/listas" element={<ProtectedRoute><Listas/></ProtectedRoute>} />
          <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes/></ProtectedRoute>} />
          <Route path="/sobre" element={<Sobre/>} />
          <Route path="/autores/novo" element={<ProtectedRoute><AutorForm /></ProtectedRoute>}/>
          <Route path="/autores/editar/:id" element={<ProtectedRoute><AutorForm /></ProtectedRoute>}/>
          <Route path="/generos/novo" element={<ProtectedRoute><GeneroForm /></ProtectedRoute>}/>
          <Route path="/generos/editar/:id" element={<ProtectedRoute><GeneroForm /></ProtectedRoute>}/>
          <Route
  path="/perfil"
  element={
    <ProtectedRoute>
      <PerfilUsuario />
    </ProtectedRoute>
  }
/>

<Route
  path="/configuracoes/editar"
  element={
    <ProtectedRoute>
      <Configuracoes />
    </ProtectedRoute>
  }
/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
