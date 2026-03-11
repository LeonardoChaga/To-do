Cypress.Commands.add('loginCorrect', (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit('/login');
        cy.get('[data-cy="email-input"]').type(Cypress.env(email));
        cy.get('[data-cy="password-input"]').type(Cypress.env(password));
        cy.get('[data-cy="login-button"]').click();
        cy.url().should('include', '/kanban');
    });
});