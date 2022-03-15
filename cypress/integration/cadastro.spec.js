/// <reference types="cypress" />

var Chance = require('chance');
var chance = new Chance();

describe('Cadastro', () => {
    it('Quando eu informar os dados e finalizar, então o cadastro deve ser efetuado', () => {
        cy.visit('https://form-agilizei.netlify.app')

        // Inputs de texto / textarea / email -> type       
        cy.get('input[name=firstName]').type(chance.first())
        cy.get('input[name=lastName]').type(chance.last())
        cy.get('textarea[name=adress]').type(chance.address())
        cy.get('input[name=emailAdress]').type(chance.email())

        // Inputs radio / checkbox -> check

        cy.get('input[value=f]').check()

        cy.get('input[type=checkbox]').check('Netflix')
        cy.get('input[type=checkbox]').check('Dormir')
        
        // Inputs do tipo combobox / select -> select
        // force true não é uma boa prática

        cy.get('select#countries').select('Índia', { force: true}) 
        cy.get('select#years').select(chance.year({min: 1980, max: 2020}), { force: true})
        cy.get('select#months').select('Julho', { force: true})
        cy.get('select#days').select(chance.integer({ min: 1, max: 20 }), { force: true})

        // Inputs de senha -> type

        cy.get('input#firstpassword').type('Abc1234*')
        cy.get('input#secondpassword').type('Abc1234*')

        cy.get('#submitbtn').click()

        cy.url().should('contain', 'listagem')

    });
});