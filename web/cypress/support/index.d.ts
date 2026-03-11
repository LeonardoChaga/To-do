declare namespace Cypress {
  interface Chainable {
    loginCorrect(email: string, password: string): Chainable<void>;
  }
}
