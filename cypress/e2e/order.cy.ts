describe('Создание заказа — полный флоу', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.setCookie('accessToken', 'mock-access-token');
    window.localStorage.setItem('refreshToken', 'mock-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    window.localStorage.clear();
  });

  it('Создаёт заказ и открывает модалку с номером', () => {
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .scrollIntoView()
      .closest('li')
      .contains('Добавить')
      .click();

    cy.contains('Соус традиционный галактический')
      .scrollIntoView()
      .closest('li')
      .contains('Добавить')
      .click();

    cy.contains('Краторная булка N-200i (верх)').should('be.visible');

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093c'
        ]
      });

    cy.get('[data-testid="modal"]').should('be.visible');
    cy.contains('Ваш заказ начали готовить').should('be.visible');
    cy.contains('12345').should('be.visible');

    cy.get('[data-testid="CloseButton"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');

    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="constructor-ingredient"]').should('not.exist');
  });
});
