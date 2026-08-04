<template>
        <cardProduct v-for="produk in listProduk.slice(0, 6)" :key="produk" :dataProduk="produk"/>
</template>

<script setup>
    import cardProduct from './CardProduct.vue'
    defineProps({
        listProduk: Object
    })
    
</script>