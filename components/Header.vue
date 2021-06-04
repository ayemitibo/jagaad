<template>
  <header class="header container">
    <h1 class="page-title">BRAND</h1>
    <aside class="header-bag">
      <div class="header-bag__item header-bag__count cursor-pointer relative">
        <div class="header-bag__price">
          &euro; {{ getPrice && getPrice.toFixed(2) }}
        </div>
        <base-icon
          name="bag"
          @click.stop="showModal('cart')"
          class="bag-icon"
        />
        <span class="bag__item-counter">{{ getCartlength }}</span>
        <slot
          v-if="shown == 'cart'"
          name="cart"
          :cart-item-prop="cartProducts"
          :total="getPrice && getPrice.toFixed(2)"
        />
      </div>
      <div
        class="header-bag__item header-bag__wishlist-count cursor-pointer relative"
      >
        <base-icon name="wishlist" @click.stop="showModal('wishlist')" />
        <span class="bag__item-counter">{{ getWishlength }}</span>
        <slot
          v-if="shown == 'wishlist'"
          name="wishlist"
          :wish-list-prop="wishlist"
          :total="getWishPrice && getWishPrice.toFixed(2)"
        />
      </div>
    </aside>
  </header>
</template>

<script>
export default {
  props: {
    cartProducts: {
      type: Object,
      required: true,
    },
    wishlist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      shown: "",
    };
  },
  computed: {
    getCartlength() {
      return Object.keys(this.cartProducts).length;
    },
    getWishlength() {
      return Object.keys(this.wishlist).length;
    },
    getPrice() {
      return (
        Object.values(this.cartProducts).reduce((acc, num) => {
          let matches = num.net_price.toString().match(/[0-9]{1,}\.[0-9]{1,}/);
          if (matches?.length) {
            return acc + Number(num.quantity * matches[0]);
          }
        }, 0) || 0
      );
    },
    getWishPrice() {
      return (
        Object.values(this.wishlist).reduce((acc, num) => {
          let matches = num.net_price.toString().match(/[0-9]{1,}\.[0-9]{1,}/);
          if (matches?.length) {
            return acc + Number(num.quantity * matches[0]);
          }
        }, 0) || 0
      );
    },
  },
  methods: {
    showModal(type) {
      if (this.shown == type) {
        this.shown = "";
      } else {
        this.shown = type;
      }
    },
  },
};
</script>

