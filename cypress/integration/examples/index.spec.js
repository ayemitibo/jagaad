
let products;
describe('Load content', () => {
    it('Find the product Title', () => {
        cy.visit('http://localhost:3000')
        products = cy.get("ul li")
        products.should('have.length', 6)
        cy.get("ul li").first().get('button.button--primary').first().click()
    })
})



describe('Add product to cart', () => {
    it('get a particulat product', () => {

    })
})