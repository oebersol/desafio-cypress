/// <reference types="cypress"/>

import page_objects from '../support/page_objects.js'

const usuarios = require('../fixtures/usuarios.json')

//2. Navegação e Pesquisa: Navegar até a seção de produtos e realizar uma pesquisa.

describe('Fazendo login', ()=>{

    beforeEach('Acessando página e fazendo login', ()=>{
        cy.visit('/')

        page_objects.login(usuarios.valid_user, usuarios.password);

        cy.get(page_objects.elementos.campo_filtro).should('be.visible')

            
    })

//ainda falta
    it('Navegando', () =>{

        cy.get(page_objects.elementos.campo_filtro).select('za') // Para "Name (Z to A)"
        cy.get(page_objects.elementos.campo_filtro).select('lohi') // Para "Price (low to high)"
        cy.get(page_objects.elementos.campo_filtro).select('hilo') // Para "Price (high to low)"
        cy.get(page_objects.elementos.campo_filtro).select('az') // Para "Name (A to Z)"
              
    })

})