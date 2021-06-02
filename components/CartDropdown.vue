<template>
  <div class="cart-dropdown" v-bind="$attrs">
    <div
      class="grid grid-cols-3 border border-b-1 border-gray-200 p-5"
      v-for="(item, name, index) in item"
      :key="index"
    >
      <img
        :src="`${item.cover_image_url}?q=60&fit=crop&w=100`"
        alt=""
        srcset=""
        class="cart-image"
      />
      <div class="flex flex-col ml-2 break-words">
        <h1 class="font-bold">{{ item.title }}</h1>
        <p>{{ item.quantity }} X {{ item.net_price }}</p>
      </div>
      <button class="flex justify-end">
        <img src="~assets/svg/cancel-button.svg" alt="" srcset="" class="w-4" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.cart-dropdown {
  position: absolute;
  top: 60px;
  left: 10px;
  transform: translate(1000px, 0);
  width: auto;
  min-width: 300px;
  min-height: 340px;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
  .cart-image {
    width: auto;
    height: 100px;
  }
}
</style>
