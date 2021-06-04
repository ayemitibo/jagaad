<template>
  <div class="container">
    <base-header :cart-products="cart" :wishlist="wishlist">
      <template #cart="{ cartItemProp, total }">
        <base-cart-dropdown
          v-bind="{ item: cartItemProp, total, type: 'cart' }"
          @deleteItem="deleteItem"
        />
      </template>
      <template #wishlist="{ wishListProp, total }">
        <base-cart-dropdown
          @deleteItem="deleteItem"
          v-bind="{ item: wishListProp, total, type: 'wishlist' }"
        />
      </template>
    </base-header>
    <main class="product-page">
      <div class="container">
        <base-product :products="products" @add-product="addProduct" />
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
      cart: {},
      wishlist: {},
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
    addProduct({ item, type }) {
      if (this[type][item.id]) {
        this.$set(this[type], item.id, {
          ...item,
          quantity: this[type][item.id].quantity + 1,
        });
      } else {
        this.$set(this[type], item.id, {
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
    deleteItem({ name, type }) {
      console.log("here");
      this.$delete(this[type], name);
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
