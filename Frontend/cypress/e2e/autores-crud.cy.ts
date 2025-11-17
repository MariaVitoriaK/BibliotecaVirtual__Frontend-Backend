describe("CRUD de Autores", () => {

  const autor = {
    nome: "Teste Autor",
    dataNascimento: "1980-01-01",
    descricao: "Descrição do autor para teste",
    foto: "https://picsum.photos/200"
  };

  const autorEditado = {
    nome: "Autor Editado",
    dataNascimento: "1985-05-05",
    descricao: "Descrição editada",
    foto: "https://picsum.photos/300"
  };

  // login antes dos testes
  before(() => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("Deve criar um novo autor", () => {
    cy.visit("http://localhost:5173/autores/novo");

    cy.get("input[name=nome]").type(autor.nome);
    cy.get("input[type=date]").type(autor.dataNascimento);
    cy.get("textarea").type(autor.descricao);
    cy.get("input[name=foto]").type(autor.foto);

    cy.contains("Criar Autor").click();

    // verifica se o autor apareceu na lista
    cy.contains(autor.nome).should("exist");
  });

  it("Deve editar o autor", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");

    cy.visit("http://localhost:5173/autores");

    // clica no último botão de editar (último criado)
    cy.get('[data-cy^="editar-autor-btn-"]').last().click();

    cy.get("input[name=nome]").clear().type(autorEditado.nome);
    cy.get("input[type=date]").clear().type(autorEditado.dataNascimento);
    cy.get("textarea").clear().type(autorEditado.descricao);
    cy.get("input[name=foto]").clear().type(autorEditado.foto);

    cy.contains("Salvar Alterações").click();

    // verifica se o autor editado apareceu
    cy.contains(autorEditado.nome).should("exist");
  });

  it("Deve excluir o autor", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type("teste@email.com");
    cy.get("input[name=password]").type("123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:5173/");

    cy.visit("http://localhost:5173/autores");

    // clica no último botão de excluir
    cy.get('[data-cy^="excluir-autor-btn-"]').last().click();

    // confirma o alert do navegador
    cy.on("window:confirm", () => true);

    // garante que o autor não existe mais
    cy.contains(autorEditado.nome).should("not.exist");
  });

});
