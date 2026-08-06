<template>
        <cardProduct v-for="produk in listProduk.slice(0, 6)" :key="produk" :dataProduk="produk" :index="index"/>
</template>

<script setup>
    import cardProduct from './CardProduct.vue'
    defineProps({
        listProduk: Object,
        index: Number
    })
    
</script>