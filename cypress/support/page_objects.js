/// <reference types="cypress"/>

const elementos = {
    btn_login: '#login-button',
    campo_name: '#user-name',
    campo_senha: '#password',
    botao_login: '#login-button',
    campo_filtro: '.product_sort_container',
    campo_erro: '.login_container',
    
};

const login = (user, password) => {
    cy.get(elementos.campo_name).type(user);
    cy.get(elementos.campo_senha).type(password);
    cy.get(elementos.botao_login).click();
};

export default {
    elementos,
    login
};
