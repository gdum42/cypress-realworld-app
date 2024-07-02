class signin {
    elements = {
        usernameField : () => cy.get('#username'),
        passwordField : () => cy.get('#password'),
        rememberMeCheckbox : () => cy.get('[data-test="signin-remember-me"]'),
        submitFormBtn : () => cy.get('[data-test="signin-submit"]'),
        signUpBtn : () => cy.get('[data-test=signup]'),
        errorMessage: () => cy.get('[data-test="signin-error"]'),
        usernameHelper: () => cy.get('#username-helper-text')
    }

    login(username = Cypress.env('defaultUsername'), password = Cypress.env('defaultPassword')) {
        this.elements.usernameField().type(username)
        this.elements.passwordField().type(password)
        this.elements.submitFormBtn().click()
    }
}

module.exports = new signin()
