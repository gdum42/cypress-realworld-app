class homepage {
    elements = {
        sidenavUsername : () => cy.get('[data-test="sidenav-username"]')
    }
}

module.exports = new homepage()
