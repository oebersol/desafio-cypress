/// <reference types="cypress"/>

//3. Validação do Produto: Selecionar um produto, verificar o título, preço e descrição.

import page_objects from '../support/page_objects.js'

const usuarios = require('../fixtures/usuarios.json')

describe('Validação do produto', ()=>{

    beforeEach('Acessando página de cadastro e fazendo login', ()=>{
        cy.visit('/')

            cy.get('#user-name').type(usuarios.valid_user)
            cy.get('#password').type(usuarios.password)
    
            cy.get('#login-button').click()
    
            cy.get('.product_sort_container').should('be.visible')
            
    })

    it('Verificando o título', () =>{

        //Escolhendo de Z para A devido ao último elemento estar com o nome inválido         
        cy.get('[data-test="product-sort-container"]').select('za') // Para "Name (Z to A)"
        
        cy.get('[data-test="inventory-item-name"]').first().click()
        
        cy.get('#add-to-cart').should('exist')

        cy.get('.inventory_details_name').first().invoke('text').then((productName) => {
            // Valida se começa com letra maiúscula
            expect(productName).to.match(/^[A-Z]/);
      
            // Valida se não contém caracteres especiais (exceto espaços e parênteses, se permitido)
            expect(productName).to.match(/^[A-Z][A-Za-z0-9 ()\-]*$/);
        })

        
    })


    it('Verificando o preço', () =>{
        
        cy.get('[data-test="inventory-item-name"]').first().click()
        
        cy.get('#add-to-cart').should('exist')

        cy.get('.inventory_details_price').first().invoke('text').then((price) => {
            // Valida contém números
            expect(price).to.match(/^\$?\d+(\.\d{1,2})?$/);
      
        })

        //teste
        
    })

    it('Verificando a descrição', () =>{

        //Garantindo que o primeiro produto seja listado, pois está com a descrição com erros      
        cy.get('[data-test="product-sort-container"]').select('az') // Para "Name (A to Z)"
        
        cy.get('[data-test="inventory-item-name"]').first().click()
        
        cy.get('#add-to-cart').should('exist')

        cy.get('.inventory_details_desc').first().invoke('text').then((desc) => {
            // Valida se começa com letra maiúscula
            expect(desc).to.match(/^[A-Z]/);
      
            // Valida se não contém caracteres especiais (exceto espaços e parênteses, se permitido)
            expect(desc).to.match(/^[A-Z][A-Za-z0-9 ()\-.,]*$/);
        })
        
    })

})