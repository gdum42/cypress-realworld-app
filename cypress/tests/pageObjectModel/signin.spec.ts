import signin from '../../pages/signin'
import homepage from '../../pages/homepage'

beforeEach(() => {
    cy.visit('/')
})

describe('login tests with page object model', () => {
    it('signin with an existing account', () => {
        signin.login()
        homepage.elements.sidenavUsername().should('contain', Cypress.env('defaultUsername'))
    })

    it('signin with an incorrect password', () => {
        signin.login(Cypress.env('defaultUsername'), 'secret')
        signin.elements.errorMessage().should('contain', 'Username or password is invalid')
        homepage.elements.sidenavUsername().should('not.exist')
    })

    it('signin with an incorrect username', () => {
        signin.login('Tess')
        signin.elements.errorMessage().should('contain', 'Username or password is invalid')
        homepage.elements.sidenavUsername().should('not.exist')
    })

    it('Cannot signin with empty form', () => {
        signin.elements.submitFormBtn().click()
        signin.elements.usernameHelper().should('contain', 'Username is required')
        signin.elements.submitFormBtn().should('be.disabled')
    })

    it('Cannot signin with empty password', () => {
        signin.elements.usernameField().type(Cypress.env('defaultUsername'))
        signin.elements.submitFormBtn().should('be.disabled')
    })
})
