
<template>
    <!-- Looping Kategori -->
    <template v-for="kategori in katalog_percetakan" :key="kategori.kategori">
      <ProductCard v-for="item in kategori.produk" :item="item" :key="item.id" :namaKategori="kategori.kategori"/>    
      <Container />
    </template>
</template> 

<script setup>
        import { ref } from 'vue';
        import ProductCard from './coba2.vue';
        import dataProduk from '../../data/list-produk.json';
        import Container from './coba3.vue';
        const katalog_percetakan = ref(dataProduk);
</script>
