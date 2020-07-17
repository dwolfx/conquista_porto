context('Funds List', function() {
  before(() => {
    cy.login()
    cy.visit('/investimentos/lista-fundos')
    cy.findByTestId('funds-loading').should('be.visible')
    cy.findByTestId('funds-loading').should('not.be.visible')
  })

  it('[Percy] Load the page', function() {})

  context('Filters', function() {
    afterEach(function () {
      cy.findByTestId('clear-filter').click()
    })

    it('Filter funds by type', function() {
      cy.get('div[data-testid="fund-row"]').as('listedFunds').then(funds => {
        this.allFunds = funds.length
      })
      cy.findByTestId('renda-fixa').click()
      cy.get('@listedFunds').then(list => {
        list.each($row => {
          cy.wrap($row).get('p[type="caption"]').should('contain', 'Renda Fixa')
        })

        expect(list.length).to.be.lessThan(this.allFunds)
      })
      cy.findByTestId('clear-filter').click()
    })

    it('Filter funds by risk', function() {

      cy.get('div[data-testid="fund-row"]').as('listedFunds').then(list => {
        this.allFunds = list.length
      })

      cy.findByTestId('fund-filter-risk').within(() => {
        cy.get('*[value="baixo"]').click().then(() => {
          cy.get('@listedFunds').then((filteredFunds) => {
            expect(filteredFunds.length).to.be.lessThan(this.allFunds)
          })
        })
      })
    })

    it('Apply fund type and risk filter', function() {
      cy.get('div[data-testid="fund-row"]').as('listedFunds').then(funds => {
        this.allFunds = funds.length
      })
      cy.findByTestId('renda-fixa').click()
      cy.findByTestId('fund-filter-risk').within(() => {
        cy.get('*[value="medio-baixo"]').click()
      })

      cy.get('@listedFunds').then((filteredFunds) => {
        expect(filteredFunds.length).to.be.lessThan(this.allFunds)
      })
    })

    it('Clear applied fund type and risk filter', function() {
      cy.get('div[data-testid="fund-row"]').as('listedFunds').then(funds => {
        this.initialFunds = funds.length
        cy.log(`Initial funds found: ${this.initialFunds}`)
      })
      cy.findByTestId('renda-fixa').click()
      cy.findByTestId('fund-filter-risk').within(() => {
        cy.get('*[value="medio-baixo"]').click()
      })
      cy.findByTestId('clear-filter').click().then(() => {
        cy.get('div[data-testid="fund-row"]').then((afterFilterClear) => {
          cy.log(`After clearing the filter, found funds: ${afterFilterClear.length}`)
          expect(afterFilterClear.length).to.equal(this.initialFunds)
        })
      })
    })

    it('[Percy] Apply fund type and risk filter', function() {})
  })

  context('Investment Fund Table', function() {
    it('Order table columns by ascending', function() {
      cy.get('.header').within(() => {
        cy.get('[title="Toggle SortBy"]').each($title => {
          cy.wrap($title).click().then(() => {
            cy.log(`Ordering column ${$title.text()} by ascending`)
          })
        })
      })
    })

    it('Order table columns by descending', function() {
      cy.get('.header').within(() => {
        cy.get('[title="Toggle SortBy"]').each($title => {
          cy.wrap($title).click().click().then(() => {
            cy.log(`Ordering column ${$title.text()} by descending`)
          })
        })
      })
    })
  })

  context('Drawer', function() {
    it('[Percy] Drawer open', function() {})

    it('Navigate through tabs', function() {
      cy.get('div[data-testid="fund-row"]').first().click()
      cy.get('div[data-testid="drawer-tabs"] div').each($tab => {
        cy.wrap($tab).click()
      })
    })
  })
})
