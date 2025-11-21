describe('Burger Constructor — добавление ингредиентов по клику', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('ингредиенты из моковых данных', () => {
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии')
      .scrollIntoView()
      .should('be.visible');
    cy.contains('Соус традиционный галактический')
      .scrollIntoView()
      .should('be.visible');
    cy.contains('Флюоресцентная булка R2-D3')
      .scrollIntoView()
      .should('be.visible');
  });

  it('Добавляет булку по клику', () => {
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-testid="constructor-bun-top"]')
      .should('be.visible')
      .and('contain.text', 'Краторная булка N-200i');

    cy.get("[data-testid='constructor-bun-bottom']").should(
      'contain.text',
      'Краторная булка N-200i (низ)'
    );
  });

  it('Добавляет начинку и соус по клику', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.contains('Соус традиционный галактический')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-ingredients-list"]')
      .should('contain.text', 'Биокотлета из марсианской Магнолии')
      .and('contain.text', 'Соус традиционный галактический');
  });

  it('Собирает полный бургер (булка + начинка + соус)', () => {
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.contains('Соус традиционный галактический')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-bun-top"]').should('exist');
    cy.get('[data-testid="constructor-ingredients-list"]')
      .children()
      .should('have.length', 2);
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
  });
});
