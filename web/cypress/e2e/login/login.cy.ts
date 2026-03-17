describe('Testes na tela de login.', () => {
    beforeEach(() => {
        cy.visit('/kanban');
    });

    // --- Credenciais válidas e inválidas ---

    it('Deve realizar o login com credenciais válidas', () => {
        cy.loginCorrect('validUsername', 'validPassword');
    });

    it('Deve rejeitar o login com credenciais inválidas', () => {
        cy.loginIncorrect('invalidUsername', 'invalidPassword');
    });

    // --- Testes de segurança ---

    it('Deve rejeitar tentativa de login com injeção de SQL', () => {
        cy.loginSqlInjection('sqlInjectionUsername', 'sqlInjectionPassword');
    });

    it('Deve rejeitar tentativa de login com payload XSS', () => {
        cy.loginXss('xssUsername', 'xssPassword');
    });

    it('Deve rejeitar login com credenciais excessivamente longas', () => {
        cy.loginLongCredentials('longUsername', 'longPassword');
    });

    it('Deve rejeitar login com credenciais contendo apenas espaços em branco', () => {
        cy.loginWhitespace('whitespaceUsername', 'whitespacePassword');
    });

    it('Deve rejeitar login com credenciais em formato inválido', () => {
        cy.loginInvalidFormat('invalidFormatUsername', 'invalidFormatPassword');
    });

    it('Deve bloquear após múltiplas tentativas de login falhas seguidas', () => {
        cy.loginBruteForce('invalidUsername', 'invalidPassword');
    });

    // --- Campos vazios e parcialmente preenchidos ---

    it('Deve rejeitar login com campos de email e senha vazios', () => {
        cy.loginEmptyFields();
    });

    it('Deve rejeitar login com apenas o email preenchido', () => {
        cy.loginOnlyEmail('validUsername');
    });

    it('Deve rejeitar login com apenas a senha preenchida', () => {
        cy.loginOnlyPassword('validPassword');
    });

    // --- Comportamento de autenticação ---

    it.only('Deve redirecionar para /kanban se o usuário já estiver autenticado', () => {
        cy.loginAlreadyAuthenticated('validUsername', 'validPassword');
    });

    it('Deve garantir que o campo de senha não expõe o conteúdo no DOM', () => {
        cy.visit('/login');
        cy.get('[data-cy="password-input"]').should('have.attr', 'type', 'password');
    });
});
