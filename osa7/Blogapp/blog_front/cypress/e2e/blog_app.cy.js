describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Wilma Koira',
      username: 'wilmadoggy',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')


  })


  it('a new blog can be created', function() {
    cy.contains('log in').click()
    cy.get('#username').type('wilmadoggy')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('wilmadoggy')
    cy.get('#password').type('salisvaara')
    cy.get('#login-button').click()

    cy.contains('Wrong username or password')
    cy.get('html').should('not.contain', 'wilmadoggy logged in')
  })
})
describe('User who is logged in succesfully can do stuff', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Wilma Koira',
      username: 'wilmadoggy',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('User can create blog and like it', function() {
    cy.contains('log in').click()
    cy.get('#username').type('wilmadoggy')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('create new blog').click()
    cy.get('#title-input').type('testiblogi cypress')
    cy.get('#author-input').type('testikirjoittaja cypress')
    cy.get('#url-input').type('testiURL cypress')
    cy.contains('Save').click()
    cy.contains('testiblogi cypress')

    cy.contains('Show').click()
    cy.contains('Like').click()
    cy.contains('This blog has: 1 likes')
   
  })
  it('User can delete a blog', function() {
    cy.contains('log in').click()
    cy.get('#username').type('wilmadoggy')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('create new blog').click()
    cy.get('#title-input').type('testiblogi cypress')
    cy.get('#author-input').type('testikirjoittaja cypress')
    cy.get('#url-input').type('testiURL cypress')
    cy.contains('Save').click()
    cy.contains('testiblogi cypress')

    cy.contains('Show').click()
    cy.contains('Remove').click()
    cy.contains('Blog deleted succesfully!')
   
  })

  it.only('Blogs are in ascending order', function() {
    cy.contains('log in').click()
    cy.get('#username').type('wilmadoggy')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('create new blog').click()
    cy.get('#title-input').type('testiblogi cypress')
    cy.get('#author-input').type('testikirjoittaja cypress')
    cy.get('#url-input').type('testiURL cypress')
    cy.contains('Save').click()
    cy.contains('testiblogi cypress')

    cy.contains('create new blog').click()
    cy.get('#title-input').type('testiblogi cypress 2')
    cy.get('#author-input').type('testikirjoittaja cypress 2')
    cy.get('#url-input').type('testiURL cypress 2')
    cy.contains('Save').click()
    cy.contains('testiblogi cypress 2')

    cy.get('.blogi').eq(0).contains('Show').click()
    cy.get('.blogi').eq(0).contains('Like').click()
    cy.get('.blogi').eq(1).contains('This blog has: 1 likes')
    cy.get('.blogi').eq(0).contains('Show').click()
    cy.get('.blogi').eq(0).contains('This blog has: 0 likes')

    cy.get('.blogi').eq(0).contains('testiblogi cypress 2')

  })

 
})



