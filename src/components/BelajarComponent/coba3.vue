<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProductCard v-for="item in kategori.produk" :item="item" :key="item.id" :namaKategori="kategori.kategori"/>
    </div>
</template>
 
<script setup>
        import ProductCard from './coba2.vue';
        defineProps({
            kategori: {
                type: Object,
                required: true
            }
        });
</script>