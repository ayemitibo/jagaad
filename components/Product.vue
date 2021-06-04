<template>
  <ul class="product-list">
    <li
      class="product-list__item"
      v-for="(item, index) in products"
      :key="index"
    >
      <article class="product" itemscope itemtype="http://schema.org/Product">
        <figure class="product__image-wrapper">
          <img
            class="product__image"
            :src="item.cover_image_url"
            alt="Product"
            itemprop="image"
          />
          <button
            class="product__wishlist-button button button--round button--wishlist"
            @click="addToCart(item, 'wishlist')"
          >
            <base-icon name="wishlist"></base-icon>
          </button>
        </figure>
        <div class="product__details">
          <h1 class="product__title" itemprop="brand">{{ item.title }}</h1>
          <p class="product__subtitle" itemprop="description">
            {{ item.description }}
          </p>
          <div
            class="product__price"
            itemscope
            itemtype="http://schema.org/Offer"
          >
            <span class="product__price--strike">£210</span
            ><span class="product__price--discounted" itemprop="price">{{
              item.net_price
            }}</span>
          </div>
          <button
            class="product__add-to-cart button button--primary"
            @click="addToCart(item, 'cart')"
          >
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  </ul>
</template>
<script >
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToCart(item, type) {
      this.$emit("add-product", { item, type });
    },
  },
};
</script>