import signin from '../../pages/signin'
import signup from '../../pages/signup'
import homepage from '../../pages/homepage'
import { faker } from "@faker-js/faker"

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

    it('Signin after having created an account', () => {
        cy.fixture('accountCreation').then(json => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('apiUrl')}/users`,
                body: json
            })
        })
        signin.login('salmon', Cypress.env('accountCreationPassword'))
    })
})

describe('sign up tests', () => {
    beforeEach(() => {
        cy.intercept('POST', `${Cypress.env('apiUrl')}/users`).as('users')
        signin.elements.signUpBtn().click()
    })

    it('create an account', () => {
        signup.fillAccountData(faker.name.firstName(), faker.name.lastName(), faker.random.word(), Cypress.env('accountCreationPassword'))
        signup.elements.submitFormBtn().click()
        cy.wait('@users').then(xhr => {
            console.log('xhr', xhr)
            expect(xhr.response?.statusCode).to.eq(201, `response ${xhr.response?.statusCode} status should be 201`)
        })
    })

    it('Try to create an account with a wrong password confirmation', () => {
        signup.fillAccountData(faker.name.firstName(), faker.name.lastName(), faker.random.word(), Cypress.env('accountCreationPassword'), 'wrongPassword')
        signup.elements.confirmPasswordHelper().should('contain', 'Password does not match')
        signup.elements.submitFormBtn().should('be.disabled')
        cy.get('@users').should('not.exist')
    })
})
