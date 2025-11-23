# 📚 Biblioteca Virtual

Este projeto é uma aplicação web completa (Backend e Frontend) desenvolvida para gerenciamento de uma biblioteca virtual pessoal.

---

## 🌟 Tecnologias e Requisitos

### 🛠️ Back‑end

**Framework -** Node.js + Express.

**Banco de Dados -** MySQL (XAMPP).

**Autenticação -** JWT.

**Testes -** Jest / Supertest.

---

### 🎨 Front‑end

**Framework -** React.

**Estilização -** React Bootstrap e outros.

**Animações -** Framer Motion.

**Testes -** Cypress.

---

### 🔗 Estrutura dos Recursos da API

- **/auth** --- ❌ `/register`, `/login`

- **/autores** Completo ✔️ Todas as rotas CRUD

- **/generos** Completo ✔️ Todas as rotas CRUD

- **/livros** Completo ✔️ Todas as rotas CRUD

- **/usuarios** Consulta/Update ✔️ `/me`, `/update`

---

## 🚀 Como Executar o Projeto

### **1️⃣ Back‑end (API)**

Configure o banco de dados no XAMPP:

- Inicie Apache e MySQL
- Crie os BD: `biblioteca_front` e `biblioteca_test`

```Bash
cd backend
npm install
npm run dev
```

A API estará em **http://localhost:3001**

---

### **2️⃣ Front‑end (React)**

```Bash
cd frontend
npm install
npm run dev
```

O front abre em **http://localhost:3000**

---

### 🧪 Testes Automatizados

**Back‑end:**

```Bash
cd backend
npm run test
```

**Front‑end (Cypress):**

```Bash
cd frontend
npx cypress open
```

---

## 🎬 Apresentação em Vídeo

👉 **[Vídeo](https://youtu.be/HqA-nsQWQfg)**

---

**Repositório do GitHub:** `https://github.com/MariaVitoriaK/BibliotecaVirtual__Frontend-Backend.git`
