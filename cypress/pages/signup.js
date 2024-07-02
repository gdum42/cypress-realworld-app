class signup {
    elements = {
        firstNameField : () => cy.get('#firstName'),
        lastNameField : () => cy.get('#lastName'),
        usernameField : () => cy.get('#username'),
        passwordField : () => cy.get('#password'),
        confirmPasswordField : () => cy.get('#confirmPassword'),
        submitFormBtn : () => cy.get('[data-test="signup-submit"]'),
        confirmPasswordHelper : () => cy.get('#confirmPassword-helper-text')
    }

    fillAccountData(firstName, lastName, username, password, confirmPassword = password) {
        this.elements.firstNameField().type(firstName)
        this.elements.lastNameField().type(lastName)
        this.elements.usernameField().type(username)
        this.elements.passwordField().type(password)
        this.elements.confirmPasswordField().type(confirmPassword)
    }
}

module.exports = new signup()
