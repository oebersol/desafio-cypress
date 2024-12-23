/// <reference types="cypress"/>

import page_objects from '../support/page_objects.js'

const usuarios = require('../fixtures/usuarios.json')

describe('Login', () =>  {

    beforeEach('Acessando página inicial', ()=>{
        cy.visit('/')
        cy.reload({ cache: false });

    })


    it('Login com sucesso', () =>{

        page_objects.login(usuarios.valid_user, usuarios.password);

        cy.get(page_objects.elementos.campo_filtro).should('be.visible')


    })

    it('Tentativa de login sem informar o usuário', () =>{

         cy.get(page_objects.elementos.campo_senha).type(usuarios.password)

         cy.get(page_objects.elementos.botao_login).click()

         cy.get(page_objects.elementos.campo_erro).should('be.visible')
         .and('contain.text', 'Epic sadface: Username is required');
        
    })

    it('Tentativa de login sem informar a senha', () =>{

        cy.get(page_objects.elementos.campo_name).type(usuarios.valid_user)

        cy.get(page_objects.elementos.botao_login).click()

        cy.get(page_objects.elementos.campo_erro).should('be.visible')
        .and('contain.text', 'Epic sadface: Password is required');
        
    })

    it('Tentativa de login com o usuário inválido', () =>{
        cy.visit('/')

        page_objects.login('invalid_user', usuarios.password);

        cy.get(page_objects.elementos.campo_erro).should('be.visible')
         .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
        
    })

    it('Tentativa de login com a senha inválida', () =>{
        cy.visit('/')

        page_objects.login(usuarios.valid_user, 'invalid_pass');

        cy.get(page_objects.elementos.campo_erro).should('be.visible')
        .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
        
    })

    it('Tentativa de login com a usuário bloqueado', () =>{
        cy.visit('/')

        page_objects.login(usuarios.locked_out_user, usuarios.password);

        cy.get(page_objects.elementos.campo_erro).should('be.visible')
        .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
        
    })


})