<template>
  <div class="border pr-40 pl-4 py-4 rounded w-fit">
    <h2>{{ item.nama }}</h2>
    <p>{{ item.harga }}</p>
    <p v-if="item.stok > 5">Stok tersedia: {{ item.stok }}</p>
    <p v-else-if="0 < item.stok && item.stok < 5">Stok hampir habis {{ item.stok }}</p>
    <p v-else>Stok habis</p>
    <p v-show="item.bestSeller" class="bg-red-700 text-white">🔥Best Seller</p>
  </div>
</template>

<script setup>
defineProps({
  item: Object
})
</script>
