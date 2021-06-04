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
        <h1 class="font-bold truncate overflow-ellipsis" :title="item.title">
          {{ item.title }}
        </h1>
        <p>{{ item.quantity }} X {{ item.net_price }}</p>
      </div>
      <button
        class="flex justify-end"
        @click="$emit('deleteItem', { name, type })"
      >
        <img src="~assets/svg/cancel-button.svg" alt="" srcset="" class="w-4" />
      </button>
    </div>
    <div
      v-if="total > 0"
      class="bg-red py-8 mx-4 flex justify-between text-lg font-bold border-b-2 border-gray-300 border-dashed mb-4"
    >
      <span class="text-gray-400"
        ><span class="uppercase">{{ type }}</span> SUBTOTAL:</span
      >
      <span class="ml-4">&euro;{{ total }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    total: [Number, String],
    type: [String],
  },
};
</script>

<style scoped lang="scss">
.cart-dropdown {
  @apply shadow-xl;
  position: absolute;
  top: 45px;
  right: 0px;
  width: auto;
  min-width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 5;
  .cart-image {
    width: auto;
    height: 100px;
  }
}
</style>
