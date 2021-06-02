
export default (ctx) => ({
    getProducts(payload) {
        return ctx.$axios.$get('venues/164/activities', {
            params: payload
        })
    }
})