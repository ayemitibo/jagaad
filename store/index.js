


export const state = () => ({
    products: [],
    cart: {},
})


export const mutations = {
    'SET_PRODUCTS'(state, products) {
        state.products = products
    },
    'SET_CART'(state, payload) {
        if (state.cart[payload.id]) {
            state.cart[payload.id].quantity = state.cart[payload.id].quantity + 1
        } else {
            state.cart[payload.id] = {
                ...payload,
                quantity: 1
            }
        }
    }

}

export const actions = {
    async setProducts({ commit }, payload) {
        let request = await this.$repo.getProducts(payload);
        let products = request.map((product) => {
            return {
                cover_image_url: product.cover_image_url,
                title: product.title,
                description: product.description,
                net_price: product.retail_price.formatted_value,
                id: product.uuid,
            };
        });
        commit('SET_PRODUCTS', products)
    },
    setCart({ commit }, payload) {
        commit('SET_CART', payload)
    }
}