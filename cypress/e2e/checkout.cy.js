/// <reference types="cypress"/>

const usuarios = require('../fixtures/usuarios.json')

describe('Fazendo checkout', ()=>{

    beforeEach('Acessando página de cadastro e fazendo login', ()=>{
        cy.visit('/')

            cy.get('#user-name').type(usuarios.valid_user)
            cy.get('#password').type(usuarios.password)
    
            cy.get('#login-button').click()
    
            cy.get('.product_sort_container').should('be.visible')
            
    })

    it('Adicionando produto ao carrinho e fazendo checkout', () =>{
        cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()

        cy.get('.shopping_cart_badge').should('be.visible')

        cy.get('.shopping_cart_link').click()

        cy.get('#checkout').should('be.visible')

        cy.get('#checkout').click()

        cy.get('#first-name').type('Adriano')

        cy.get('#last-name').type('Checkout')

        cy.get('#postal-code').type('44896633')

        cy.get('#continue').click()

        cy.get('#finish').should('be.visible')

        cy.get('#finish').click()

        cy.get('.complete-header').should('be.visible').and('contain.text', 'Thank you for your order!')

        
    })

})