declare namespace Cypress {
  interface Chainable {
    loginCorrect(email: string, password: string): Chainable<void>;
    loginIncorrect(email: string, password: string): Chainable<void>;
    loginSqlInjection(email: string, password: string): Chainable<void>;
    loginXss(email: string, password: string): Chainable<void>;
    loginLongCredentials(email: string, password: string): Chainable<void>;
    loginWhitespace(email: string, password: string): Chainable<void>;
    loginInvalidFormat(email: string, password: string): Chainable<void>;
    loginEmptyFields(): Chainable<void>;
    loginOnlyEmail(email: string): Chainable<void>;
    loginOnlyPassword(password: string): Chainable<void>;
    loginAlreadyAuthenticated(email: string, password: string): Chainable<void>;
    loginBruteForce(email: string, password: string): Chainable<void>;
  }
}
