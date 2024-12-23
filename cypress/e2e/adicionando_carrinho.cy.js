/// <reference types="cypress"/>

const usuarios = require('../fixtures/usuarios.json')

describe('Adicionando e removendo do carrinho', ()=>{

    beforeEach('Acessando página de cadastro e fazendo login', ()=>{
        cy.visit('/')

            cy.get('#user-name').type(usuarios.valid_user)
            cy.get('#password').type(usuarios.password)
    
            cy.get('#login-button').click()
    
            cy.get('.product_sort_container').should('be.visible')
            
    })

     afterEach('Desconectando do usuário', () =>{

             cy.get('#react-burger-menu-btn').click();
             cy.get('#logout_sidebar_link').click();


     })


    it('Clicando em um produto e retornando', () =>{
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()

        cy.get('#back-to-products').click()
        cy.get('.product_sort_container').should('be.visible')


    })

    it('Adicionando ao carrinho pela listagem e verificando se adicionou', () =>{
        cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()

        cy.get('.shopping_cart_badge').should('be.visible')

        cy.get('.shopping_cart_link').click()

        
    })
    
    
    it('Removendo o produto do carrinho pela listagem e verificando removeu', () =>{

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('[data-test="remove-sauce-labs-backpack"]').click();

        cy.get('.shopping_cart_badge').should('not.exist')


    })


    it('Adicionando e removendo o produto do carrinho pela tela do produto', () =>{
        cy.get('[data-test="item-4-title-link"]').click()

        cy.get('#add-to-cart').click()

        cy.get('.shopping_cart_badge').should('be.visible')

        cy.get('#remove').click()

        cy.get('.shopping_cart_badge').should('not.exist')


    })


})
