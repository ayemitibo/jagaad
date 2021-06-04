
let products;
let qs = {
    limit: 6, offset: 0
}
describe('Load content ', () => {
    beforeEach(() => {
        cy.request({
            method: 'GET',
            url: "https://api.musement.com/api/v3/venues/164/activities",
            qs,
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'it',
                'X-Musement-Currency': 'EUR',
                'X-Musement-Version': '3.4.0'
            }
        }).as("products")
    })
    it('Gets product from the API', () => {
        cy.visit('http://localhost:3000/')
        cy.get('@products').then(({ body }) => {
            products = body.map((product) => {
                return {
                    cover_image_url: product.cover_image_url,
                    title: product.title,
                    description: product.description,
                    net_price: product.retail_price.formatted_value,
                    id: product.uuid,
                };
            });
            expect(body).to.have.length(6)
        })
    })
    it('Click on the First product', () => {
        cy.get("ul.product-list li").should('have.length', 6)
        cy.get("ul.product-list li").first().get('button.button--primary').first().click()
    })
    it('confirms the bag price is accumulating', () => {
        cy.get(".header-bag__price").invoke('text').then((text) => {
            expect(text.trim()).to.contain(products[0].net_price.trim())
        })
    })

    it('shows the cart item', () => {
        cy.get(".bag-icon").click()
        cy.get(".cart-dropdown").should("be.visible").children().should('have.length', 2)
        cy.get(".bag-icon").click()
    })

    it('paginates the products', () => {
        cy.get(".pagination__item:nth-of-type(3)").click()
        qs = {
            limit: 6, offset: 2
        }
        cy.get("@products").then(({ body }) => {
            expect(products).to.not.equal(body)
        })
    })
})





