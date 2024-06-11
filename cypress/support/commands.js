Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Jade')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('teste@exemplo.com')
    cy.get('#open-text-area').type('teste de mensagem')
    cy.contains('button', 'Enviar').click()
})