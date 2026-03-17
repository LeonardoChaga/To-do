Cypress.Commands.add('loginCorrect', (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit('/login');
        cy.get('[data-cy="email-input"]').type(Cypress.env(email));
        cy.get('[data-cy="password-input"]').type(Cypress.env(password));
        cy.get('[data-cy="login-button"]').click();
        cy.url().should('include', '/kanban');
    });
});

Cypress.Commands.add('loginIncorrect', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(Cypress.env(email));
    cy.get('[data-cy="password-input"]').type(Cypress.env(password));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginSqlInjection', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(Cypress.env(email));
    cy.get('[data-cy="password-input"]').type(Cypress.env(password));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginXss', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(Cypress.env(email));
    cy.get('[data-cy="password-input"]').type(Cypress.env(password));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginLongCredentials', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(Cypress.env(email));
    cy.get('[data-cy="password-input"]').type(Cypress.env(password));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginWhitespace', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(Cypress.env(email));
    cy.get('[data-cy="password-input"]').type(Cypress.env(password));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginInvalidFormat', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(Cypress.env(email));
    cy.get('[data-cy="password-input"]').type(Cypress.env(password));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginEmptyFields', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginOnlyEmail', (email: string) => {
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(Cypress.env(email));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginOnlyPassword', (password: string) => {
    cy.visit('/login');
    cy.get('[data-cy="password-input"]').type(Cypress.env(password));
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('loginAlreadyAuthenticated', (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit('/login');
        cy.get('[data-cy="email-input"]').type(Cypress.env(email));
        cy.get('[data-cy="password-input"]').type(Cypress.env(password));
        cy.get('[data-cy="login-button"]').click();
        cy.url().should('include', '/kanban');
    });
    cy.visit('/login');
    cy.url().should('include', '/kanban');
});

Cypress.Commands.add('loginBruteForce', (email: string, password: string) => {
    cy.visit('/login');
    Cypress._.times(5, () => {
        cy.get('[data-cy="email-input"]').clear().type(Cypress.env(email));
        cy.get('[data-cy="password-input"]').clear().type(Cypress.env(password));
        cy.get('[data-cy="login-button"]').click();
        cy.get('[data-cy="swal-confirm-button"]').click();
    });
    cy.url().should('include', '/login');
});
