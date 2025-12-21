describe('Anecdotes app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('If it hurts, do it more often is shown', function () {
    cy.contains('If it hurts, do it more often')
  })

  describe('Add an anecdote', function () {
    it('succeeds', function () {
      cy.get('#anecdote-input').type('FullStackOpen is a really good course')
      cy.get('#submit-button').click()

      cy.contains('FullStackOpen is a really good course')
    })
  })

  describe('Vote for an anecdote', function () {
    it('succeeds', function () {
      cy.get('html').should('not.contain', 'has 0')
      cy.get('button').contains('vote').first().click()
      cy.contains('has 1')

      cy.get('html').should('not.contain', 'has 2')
      cy.get('button').contains('vote').first().click()
      cy.get('html').should('not.contain', 'has 1')
      cy.contains('has 2')
    })
  })

  describe('Filter', function () {
    it('nothing is shown when wrong caracters are typed', function () {
      cy.contains('If it hurts, do it more often')
      cy.contains('Adding manpower to a late software project makes it later!')
      cy.contains('The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.')
      cy.contains('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.')
      cy.contains('Premature optimization is the root of all evil.')
      cy.contains('Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.')
      cy.get('#filter-input').type('jj')
      cy.get('html').should('not.contain', 'If it hurts, do it more often')
      cy.get('html').should('not.contain', 'Adding manpower to a late software project makes it later!')
      cy.get('html').should('not.contain', 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.')
      cy.get('html').should('not.contain', 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.')
      cy.get('html').should('not.contain', 'Premature optimization is the root of all evil.')
      cy.get('html').should('not.contain', 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.')
    })

    it('only one is shown with correct filter', function () {
      cy.contains('Adding manpower to a late software project makes it later!')
      cy.get('#filter-input').type('jj')
      cy.get('html').should('not.contain', 'If it hurts, do it more often')
      cy.get('html').should('not.contain', 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.')
      cy.get('html').should('not.contain', 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.')
      cy.get('html').should('not.contain', 'Premature optimization is the root of all evil.')
      cy.get('html').should('not.contain', 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.')
    })
  })
})