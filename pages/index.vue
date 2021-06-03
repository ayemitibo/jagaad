<template>
  <div class="container">
    <base-header :cart-products="cartProducts">
      <template #default="{ cartItem }">
        <base-cart-dropdown v-bind="{ item: cartItem }" />
      </template>
    </base-header>
    <main class="product-page">
      <div class="container">
        <base-product :products="products" @add-product="addProductToCart" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      cartProducts: {},
    };
  },
  async fetch() {
    await this.getProducts({ limit: 6, offset: 0 });
  },
  methods: {
    async getProducts(params) {
      let request = await this.$repo.getProducts(params);
      this.products = request.map((product) => {
        return {
          cover_image_url: product.cover_image_url,
          title: product.title,
          description: product.description,
          net_price: product.retail_price.formatted_value,
          id: product.uuid,
        };
      });
    },
    addProductToCart(item) {
      if (this.cartProducts[item.id]) {
        this.$set(this.cartProducts, item.id, {
          ...item,
          quantity: this.cartProducts[item.id].quantity + 1,
        });
      } else {
        this.$set(this.cartProducts, item.id, {
          ...item,
          quantity: 1,
        });
      }
    },
  },
};
</script>

<style>
