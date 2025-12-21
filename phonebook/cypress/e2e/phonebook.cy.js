describe('Phonebook app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { name: 'Anna', number: '040-1234556' }
    cy.request('POST', 'http://localhost:3001/api/persons', user)
    cy.visit('http://localhost:3001')
  })

  it('Anna user is shown', function () {
    cy.contains('Anna 040-1234556')
  })

  describe('Add a user', function () {
    it('succeeds with correct name and number', function () {
      cy.get('#name-input').type('Thibaut')
      cy.get('#number-input').type('012-3456789')
      cy.get('#submit-button').click()

      cy.contains('Thibaut 012-3456789')
    })

    it('fails with missing name or number', function () {
      cy.get('#submit-button').click()
      cy.contains('name or number missing')
    })

    it('fails with wrong name', function () {
      cy.get('#name-input').type('T')
      cy.get('#number-input').type('012-3456789')
      cy.get('#submit-button').click()

      cy.get('html').should('not.contain', 'T 012-3456789')
      cy.contains('Person validation failed: name: Path `name` (`T`, length 1) is shorter than the minimum allowed length (3).')
    })

    it('fails with 3 caracters number', function () {
      cy.get('#name-input').type('Thibaut')
      cy.get('#number-input').type('012')
      cy.get('#submit-button').click()

      cy.get('html').should('not.contain', 'Thibaut 012')
      cy.contains('Person validation failed: number: Path `number` (`012`, length 3) is shorter than the minimum allowed length (8).')
    })

    it('fails with wrong number', function () {
      cy.get('#name-input').type('Thibaut')
      cy.get('#number-input').type('0122222222')
      cy.get('#submit-button').click()

      cy.get('html').should('not.contain', 'Thibaut 0122222222')
      cy.contains('Person validation failed: number: 0122222222 is not a valid phone number!')
    })
  })

  describe('Filter', function () {
    it('nothing is shown when wrong caracters are typed', function () {
      cy.contains('Anna 040-1234556')
      cy.get('#filter-input').type('Thibaut')
      cy.get('html').should('not.contain', 'Anna 040-1234556')
    })

    it('only one is shown with correct filter', function () {
      cy.contains('Anna 040-1234556')
      cy.get('#name-input').type('Thibaut')
      cy.get('#number-input').type('012-3456789')
      cy.get('#submit-button').click()

      cy.contains('Thibaut 012-3456789')

      cy.get('#filter-input').type('Thibaut')
      cy.contains('Thibaut 012-3456789')
      cy.get('html').should('not.contain', 'Anna 040-1234556')
    })
  })
})