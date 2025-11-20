describe('Модальное окно ингредиента — открытие и закрытие', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('открывает модалку ингредиента и закрывает по крестику', () => {
    cy.contains('Краторная булка N-200i').closest('a').click();

    cy.get('[data-testid="modal"]').should('exist');
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Калории').should('be.visible');

    cy.get('[data-testid="CloseButton"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.contains('Биокотлета из марсианской Магнолии').closest('a').click();

    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('body').click('topLeft');

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('закрывает модалку по клавише Escape', () => {
    cy.contains('Соус традиционный галактический').closest('a').click();

    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('body').type('{esc}');

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
