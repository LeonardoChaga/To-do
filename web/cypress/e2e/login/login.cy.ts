describe('Testes na tela de login.', () => {
    beforeEach(() => {
        cy.visit('/kanban');
    });
    
    it('Deve realizar o login com credenciais válidas', () => {
        cy.loginCorrect('validUsername', 'validPassword');
    });
});
