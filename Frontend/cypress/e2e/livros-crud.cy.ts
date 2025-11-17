describe("CRUD de Livros", () => {

  const livro = {

    titulo: "Teste Livro",
    descricao: "Descrição longa para testar.",
    imagem: "https://picsum.photos/200",
   
  };

  const livroEditado = {
    titulo: "Livro Editado",
    descricao: "Descrição editada.",
    imagem: "https://picsum.photos/300"
  };

  // Antes de testar, fazer login se sua aplicação usar login
  before(() => {
    cy.visit("http://localhost:5173/login");   // Ajuste a URL conforme seu frontend
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
   cy.get("button[type=submit]").click();
   cy.url().should("eq", "http://localhost:5173/");

  });

  it("Deve criar um novo livro", () => {
    cy.visit("http://localhost:5173/livros/novo");

    cy.get('input').first().type(livro.titulo);
    cy.get("textarea").type(livro.descricao);
    cy.get('input').eq(1).type(livro.imagem);



    cy.contains("Salvar").click();

    cy.contains(livro.titulo).should("exist");
  });


  it("Deve editar o livro", () => {
  // login
  cy.visit("http://localhost:5173/login");
  cy.get("input[name=email]").type("teste@email.com");
  cy.get("input[name=password]").type("123");
  cy.get("button[type=submit]").click();
  cy.url().should("eq", "http://localhost:5173/");

  // vai para a home (ou lista de livros)
  // agora visita home
  cy.intercept('GET', '/api/livros').as('getLivros');
  cy.visit('http://localhost:5173/');
  cy.wait('@getLivros');

  // clica no primeiro botão de editar disponível
  cy.get('[data-cy^="editar-livro-btn-"]').last().click();

  // preenche o formulário de edição
  cy.get("input").first().clear().type(livroEditado.titulo);
  cy.get("textarea").clear().type(livroEditado.descricao);

  // salva
  cy.contains("Salvar").click();

  // verifica se o título editado apareceu
  cy.contains(livroEditado.titulo).should("exist");
});

it("Deve abrir os detalhes do livro", () => {
  // login se necessário
  cy.visit("http://localhost:5173/login");
  cy.get("input[name=email]").type("teste@email.com");
  cy.get("input[name=password]").type("123");
  cy.get("button[type=submit]").click();
  cy.url().should("eq", "http://localhost:5173/");

  // visita home e espera a lista de livros carregar
  cy.intercept('GET', '/api/livros').as('getLivros');
  cy.visit('http://localhost:5173/');
  cy.wait('@getLivros');

  // clica no último botão "Ver" (último livro criado pelo Cypress)
  cy.get('[data-cy^="ver-livro-btn-"]').last().click();

  // verifica se os detalhes aparecem
  cy.contains("Descrição").should("exist");
  cy.contains(livroEditado.descricao).should("exist");
});



it("Deve excluir o livro", () => {
  // login se necessário
  cy.visit("http://localhost:5173/login");
  cy.get("input[name=email]").type("teste@email.com");
  cy.get("input[name=password]").type("123");
  cy.get("button[type=submit]").click();
  cy.url().should("eq", "http://localhost:5173/");

  // vai para a home / lista de livros
    cy.intercept('GET', '/api/livros').as('getLivros');
    cy.visit('http://localhost:5173/');
    cy.wait('@getLivros');

  // clica no último botão de excluir
  cy.get('[data-cy^="excluir-livro-btn-"]').last().click();

});

});
