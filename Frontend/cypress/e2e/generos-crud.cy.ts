describe("CRUD de Gêneros", () => {

  const genero = {
    nome: "Teste Gênero"
  };

  const generoEditado = {
    nome: "Gênero Editado"
  };

  // login antes dos testes
  before(() => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("Deve criar um novo gênero", () => {
    cy.visit("http://localhost:5173/generos/novo");

    cy.get("input[name=nome]").type(genero.nome);

    cy.contains("Criar Gênero").click();

    // verifica se o gênero apareceu na lista
    cy.contains(genero.nome).should("exist");
  });

  it("Deve editar o gênero", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.visit("http://localhost:5173/generos");

    // clica no último botão de editar (último criado)
    cy.get('[data-cy^="editar-genero-btn-"]').last().click();

    cy.get("input[name=nome]").clear().type(generoEditado.nome);

    cy.contains("Salvar").click();

    // verifica se o nome editado apareceu
    cy.contains(generoEditado.nome).should("exist");
  });

  it("Deve excluir o gênero", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.visit("http://localhost:5173/generos");

    // clica no último botão de excluir
    cy.get('[data-cy^="excluir-genero-btn-"]').last().click();
  });

});
