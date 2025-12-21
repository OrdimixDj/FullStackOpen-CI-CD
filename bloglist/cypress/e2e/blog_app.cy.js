describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {username: "test_user", name: "TEST", password: "testpassword"}
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('test_user')
      cy.get('#password-input').type('testpassword')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'Log in to application')
      cy.contains('TEST logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('wrong')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Log in to application')
      cy.contains('wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username-input').type('test_user')
      cy.get('#password-input').type('testpassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#show-create-blog-div-button').click()
      cy.get('#title-input').type('Test title')
      cy.get('#author-input').type('Test author')
      cy.get('#url-input').type('Test url')
      cy.get('#create-blog-button').click()

      cy.contains('a new blog Test title by Test author added')
      cy.contains('Test title Test author')
    })
  })

describe('When logged in and a blog created', function() {
    beforeEach(function() {
      cy.get('#username-input').type('test_user')
      cy.get('#password-input').type('testpassword')
      cy.get('#login-button').click()

      cy.get('#show-create-blog-div-button').click()
      cy.get('#title-input').type('Test title')
      cy.get('#author-input').type('Test author')
      cy.get('#url-input').type('Test url')
      cy.get('#create-blog-button').click()
    })

    it('A blog can be liked by user', function() {
      // At that state of the tests, of course only one blog is created so I can look for his button with the text
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed by user who created it', function() {
      // At that state of the tests, of course only one blog is created so I can look for his button with the text
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)

      cy.get('html').should('not.contain', 'Test title Test author')
      cy.contains('Blog Test title by Test author successfully removed')
    })

    it('Only the creator can see the remove button', function() {
      cy.contains('view').click()
      cy.get('#remove-blog-button').should('be.visible')
      cy.get('#logout-button').click()

      const user = {username: "test_user2", name: "TEST2", password: "testpassword2"}
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.get('#username-input').type('test_user2')
      cy.get('#password-input').type('testpassword2')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.get('#remove-blog-button').should('be.not.visible')
    })
  })


describe('When logged in and a several blogs created', function() {
    beforeEach(function() {
      cy.get('#username-input').type('test_user')
      cy.get('#password-input').type('testpassword')
      cy.get('#login-button').click()
      
      // Blog 1
      cy.get('#show-create-blog-div-button').click()
      cy.get('#title-input').type('Test title')
      cy.get('#author-input').type('Test author')
      cy.get('#url-input').type('Test url')
      cy.get('#create-blog-button').click()

      // Blog 2
      cy.get('#show-create-blog-div-button').click()
      cy.get('#title-input').type('Test title2')
      cy.get('#author-input').type('Test author2')
      cy.get('#url-input').type('Test url2')
      cy.get('#create-blog-button').click()
    })

    it('Blogs are sorted by likes', function() {
      cy.get('.view-button').eq(0).click()
      cy.get('.view-button').eq(1).click()

      cy.get('.blog').eq(0).should('contain', 'Test title')
      cy.get('.blog').eq(1).should('contain', 'Test title2')

      cy.get('.like-button').eq(0).click()
      cy.get('.blog').eq(0).contains('likes 1')

      cy.get('.like-button').eq(1).click()
      cy.get('.blog').eq(1).contains('likes 1')
      cy.get('.like-button').eq(1).click()

      cy.get('.blog').eq(0).should('contain', 'Test title2')
      cy.get('.blog').eq(1).should('contain', 'Test title')
    })
  })
})