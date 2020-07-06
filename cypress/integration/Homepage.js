import { gridConfig } from '../../src/styles/theme'

describe('Homepage tests', function() {
  it('Loads the homepage', function() {
    cy.login()
    cy.percySnapshot('Homepage', { widths: [
      gridConfig.breakpoints.xl,
      gridConfig.breakpoints.md,
      gridConfig.breakpoints.xs
    ]})
  })
})
