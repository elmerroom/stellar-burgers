describe('Модальное окно ингредиента — открытие и закрытие', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывает модалку ингредиента и закрывает по крестику', () => {
    const ingredientName = 'Краторная булка N-200i';

    cy.contains(ingredientName).closest('a').click();

    cy.get('[data-testid="modal"]')
      .should('exist')
      .within(() => {
        cy.contains('Детали ингредиента').should('be.visible');
        cy.contains(ingredientName).should('be.visible');
        cy.contains('Калории').should('be.visible');
      });

    cy.get('[data-testid="CloseButton"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.contains('Биокотлета из марсианской Магнолии').closest('a').click();

    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('[data-testid="modal-overlay"]').click(10, 10, { force: true });

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('закрывает модалку по клавише Escape', () => {
    cy.contains('Соус традиционный галактический').closest('a').click();

    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('body').type('{esc}');

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
