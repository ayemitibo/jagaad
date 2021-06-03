<template>
  <div class="container">
    <base-header :cart-products="cartProducts">
      <template #default="{ cartItem }">
        <base-cart-dropdown v-bind="{ item: cartItem }" />
      </template>
    </base-header>
    <main class="product-page">
      <div class="container">
        <!-- <base-spinner v-if="loading" /> -->

        <base-product :products="products" @add-product="addProductToCart" />
        <base-pagination ref="paginate" @get-products="getProducts">
          <template #default="{ currentItem }">
            <li
              class="pagination__item"
              v-for="item in 6"
              :key="item"
              @click="paginateProducts(item)"
            >
              <a
                href="#"
                class="pagination__link"
                :class="[currentItem === item ? 'active' : null]"
                >{{ item }}
              </a>
            </li>
          </template>
        </base-pagination>
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
      loading: false,
    };
  },
  async fetch() {
    await this.getProducts({ limit: 6, offset: 0 });
  },
  methods: {
    async getProducts(params) {
      this.loading = true;
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
      this.loading = false;
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
    async paginateProducts(payload) {
      await this.getProducts({ limit: 6, offset: payload });
      this.$nextTick(async () => {
        await this.$refs.paginate.next(payload);
      });
    },
  },
};
</script>

<style lang="scss">
.pagination__link {
  &.active {
    @apply underline;
  }
}
</style>
