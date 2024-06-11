/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'teste de mensagem,teste de mensagem,teste de mensagem,teste de mensagem,teste de mensagem,teste de mensagem'
        cy.get('#firstName').type('Jade')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('teste@exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Jade')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('teste@exemplo,com')
        cy.get('#open-text-area').type('teste de mensagem')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Jade')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('teste@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste de mensagem')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Jade').should('have.value', 'Jade').clear().should('have.value', '')
        cy.get('#lastName').type('Santos').should('have.value', 'Santos').clear().should('have.value', '')
        cy.get('#email').type('teste@exemplo.com').should('have.value', 'teste@exemplo.com').clear().should('have.value', '') 
        cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
})
  