describe('blog app', function() {
  beforeEach(function() {
    cy.clearLocalStorage('loggedInUser')
    cy.request('POST','http://localhost:3003/api/test/reset')
    const user = {
      username : 'mimipoot',
      name: 'Denise Camille Apostol',
      password: 'pootskie'
    }
    const dummyUser = {
      username : 'dummy',
      name: 'The Powerless One',
      password: 'imadumdum'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', dummyUser)
    cy.visit('http://localhost:3000')
  })
  it('log in form is shown', function() {
    cy.contains('Log in to the application')
  })
  describe('Login', () => {
    it('fails wrong login credentials', function() {
      cy.get('.usernameInput').type('mimipoot')
      cy.get('.passwordInput').type('wrongpassword')
      cy.contains('Enter').click()

      cy.contains('Invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
    it('accepts successful login', function() {
      cy.get('.usernameInput').clear().type('mimipoot')
      cy.get('.passwordInput').clear().type('pootskie')
      cy.contains('Enter').click()

      cy.contains('Denise Camille Apostol')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('.usernameInput').clear().type('mimipoot')
      cy.get('.passwordInput').clear().type('pootskie')
      cy.contains('Enter').click()
    })
    it('a blog can be created', function() {
      cy.contains('button', 'create').click()
      cy.get('.titleInput').type('testing the Title')
      cy.get('.authorInput').type('Arthur Testingtons')
      cy.get('.urlInput').type('www.thisisnotarealwebsite.com')
      cy.get('form button').click()

      cy.contains('testing the Title')
      cy.contains('Arthur Testingtons')
      cy.contains('www.thisisnotarealwebsite.com').should('not.exist')
    })
    describe('blog functionality', function() {
      beforeEach(function() {
        cy.contains('button', 'create').click()
        cy.get('.titleInput').type('testing the Title')
        cy.get('.authorInput').type('Arthur Testingtons')
        cy.get('.urlInput').type('www.thisisnotarealwebsite.com')
        cy.get('form button').click()

        cy.contains('testing the Title')
        cy.contains('Arthur Testingtons')
        cy.contains('www.thisisnotarealwebsite.com').should('not.exist')
      })
      it('blogs can be liked', function() {
        cy.contains('.blog', 'testing the Title').contains('button', 'show').click()
        cy.contains('www.thisisnotarealwebsite.com')

        cy.contains('p', 'likes').contains('0')

        cy.contains('p', 'likes').find('.likeButton').click()
        cy.contains('p', 'likes').contains('1')
      })
      it('blogs can be deleted', function() {
        cy.contains('.blog', 'testing the Title').contains('button', 'show').click()
        cy.contains('button', 'Delete').click()

        cy.contains('.blog', 'testing the Title').should('not.exist')
      })
      it('blogs can not be deleted by other users', function() {
        cy.clearLocalStorage('loggedInUser')
        cy.visit('http://localhost:3000')
        cy.get('.usernameInput').clear().type('dummy')
        cy.get('.passwordInput').clear().type('imadumdum')
        cy.contains('Enter').click()

        cy.contains('.blog', 'testing the Title').contains('button', 'show').click()
        cy.contains('button', 'Delete').click()

        cy.contains('.blog', 'testing the Title')
      })
      it('blogs are renders from the most likes to the least likes', function() {
        cy.contains('.blog', 'testing the Title')

        cy.contains('button', 'create').click()
        cy.get('.titleInput').type('This has the most likes')
        cy.get('.authorInput').type('Popular Homie')
        cy.get('.urlInput').type('www.somuchlikes.com')
        cy.get('form button').click()
        cy.contains('.blog', 'This has the most likes')

        cy.contains('button', 'create').click()
        cy.get('.titleInput').type('This has the medium amount of likes')
        cy.get('.authorInput').type('Normie Homie')
        cy.get('.urlInput').type('www.futsuuunoyatsuu.com')
        cy.get('form button').click()
        cy.contains('.blog', 'This has the medium amount of likes')

        cy.contains('.blog', 'This has the most likes').contains('button', 'show').click()
        cy.contains('.blog', 'This has the most likes').contains('p', 'likes 0').find('.likeButton').click()
        cy.contains('.blog', 'This has the most likes').contains('p', 'likes 1')
        cy.contains('.blog', 'This has the most likes').contains('p', 'likes 1').find('.likeButton').click()
        cy.contains('.blog', 'This has the most likes').contains('p', 'likes 2')

        cy.contains('.blog', 'This has the medium amount of likes').contains('button', 'show').click()
        cy.contains('.blog', 'This has the medium amount of likes').contains('p', 'likes 0').find('.likeButton').click()
        cy.contains('.blog', 'This has the medium amount of likes').contains('p', 'likes 1')

        cy.get('.blog').eq(0).should('contain', 'This has the most likes')
        cy.get('.blog').eq(1).should('contain', 'This has the medium amount of likes')
        cy.get('.blog').eq(2).should('contain', 'testing the Title')
      })
    })
  })
})