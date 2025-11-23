# 📚 Biblioteca Virtual

Este projeto é uma aplicação web completa (Backend e Frontend) desenvolvida para gerenciamento de uma biblioteca virtual pessoal. A solução é composta por uma API RESTful robusta em Node.js e um Front-end em React.

---

## 🌟 Tecnologias e Requisitos

### 🛠️ Back‑end

---

Requisito Tecnologia / Implementação Detalhes

---

**Framework** Node.js + Express Rotas,
middlewares,
controllers.

**Banco de Dados** MySQL (XAMPP).

**ORM** TypeORM Entidades:
_Usuario_,
_Autor_,
_Gênero_,
_Livro_.

**Autenticação** JWT Login, registro e
middleware de
proteção.

**Testes** Jest / Supertest Cobertura dos
fluxos de
autenticação e
CRUD.

---

---

### 🎨 Front‑end

---

Requisito Tecnologia / Implementação Detalhes

---

**Framework** React.

**Estilização** React Bootstrap e outros.

**Animações** Framer Motion.

**Testes E2E** Cypress Fluxos completos
de Autor, Gênero
e Livro.

---

---

## 🔗 Estrutura dos Recursos da API

---

**/auth** --- ❌ `/register`, `/login`
**/autores** Completo ✔️ Todas as rotas CRUD
**/generos** Completo ✔️ Todas as rotas CRUD
**/livros** Completo ✔️ Todas as rotas CRUD
**/usuarios** Consulta/Update ✔️ `/me`, `/update`

---

## 🚀 Como Executar o Projeto

### **1️⃣ Back‑end (API)**

Pode Clonar o repositório:

```
git clone https://github.com/MariaVitoriaK/BibliotecaVirtual__Frontend-Backend.git
cd backend
```

Entrar na pasta:

```
cd backend
```

Instale as dependências:

```
npm install
```

Configure o banco de dados no XAMPP:

- Inicie Apache e MySQL\
- Crie os BD: `biblioteca_front` e `biblioteca_test`

Inicie servidor e migrações:

```
npm run dev
```

A API estará em **http://localhost:3001**

---

### **2️⃣ Front‑end (React)**

```
cd frontend
npm install
npm run dev
```

O front abre em **http://localhost:3000**

---

### 🧪 Testes Automatizados

**Back‑end:**

```
cd backend
npm run test
```

**Front‑end (Cypress):**

```bash
cd frontend
npx cypress open
```

---

## 🎬 Apresentação em Vídeo

Insira seu link mágico aqui:

👉 **...**

---
