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

  before(() => {
    cy.visit("http://localhost:5173/login");  
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");

  });
 
  it("Deve criar um novo livro", () => {
    cy.visit("http://localhost:5173/livros/novo");

    cy.get('input[name="titulo"]').type(livro.titulo);
    cy.get('textarea[name="descricao"]').type(livro.descricao);
    cy.get('input[name="imagem"]').type(livro.imagem);
    cy.get('button[type="submit"]').click();

    cy.get("input[placeholder='Pesquisar livros...']").type(livro.titulo);

    cy.contains(livro.titulo).should("exist");
  });

  it("Deve editar o livro", () => {

  cy.visit("http://localhost:5173/login");
  cy.get("input[name=email]").type("teste@email.com");
  cy.get("input[name=password]").type("123");
  cy.get("button[type=submit]").click();
  cy.url().should("eq", "http://localhost:5173/");

  cy.intercept('GET', '/api/livros').as('getLivros');
  cy.visit('http://localhost:5173/');
  cy.wait('@getLivros');

  cy.get("input[placeholder='Pesquisar livros...']").type(livro.titulo);

  cy.get('[data-cy^="editar-livro-btn-"]').click();

  cy.get("input").first().clear().type(livroEditado.titulo);
  cy.get("textarea").clear().type(livroEditado.descricao);

  cy.contains("Salvar Alterações").click();

   cy.get("input[placeholder='Pesquisar livros...']").type(livroEditado.titulo);

  cy.contains(livroEditado.titulo).should("exist");
  });

  it("Deve abrir os detalhes do livro", () => {

    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");

    cy.intercept('GET', '/api/livros').as('getLivros');
    cy.visit('http://localhost:5173/');
    cy.wait('@getLivros');

    cy.get("input[placeholder='Pesquisar livros...']").type(livroEditado.titulo);
    cy.get('[data-cy^="ver-livro-btn-"]').last().click();

    cy.contains("Descrição").should("exist");
    cy.contains(livroEditado.descricao).should("exist");
  });

  it("Deve excluir o livro", () => {

    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");

      cy.intercept('GET', '/api/livros').as('getLivros');
      cy.visit('http://localhost:5173/');
      cy.wait('@getLivros');

    cy.get("input[placeholder='Pesquisar livros...']").type(livroEditado.titulo);

    cy.get('[data-cy^="excluir-livro-btn-"]').last().click();

  });

});
