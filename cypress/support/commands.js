import '@testing-library/cypress/add-commands'
import '@percy/cypress'
import 'cypress-wait-until';

Cypress.Commands.add('clearCache', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
});

Cypress.Commands.add('login', (username, password) => {
  cy.clearCache()
  cy.visit('/')
  cy.findByTestId('cpf-input').clear().type('332.444.528-09')
  cy.findByTestId('password-input').clear().type('senha123')
  cy.findByTestId('login-button').click()
})

Cypress.Commands.add('createObjective', (objective) => {})
