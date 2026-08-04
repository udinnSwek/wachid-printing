<template>
   <input v-model="searchQuery" placeholder="Cari produk..." />
   <Child v-for="item in hasilPencarian" :key="item.id" :item="item" />
</template>
<script setup>
import { ref,computed } from 'vue'
import Child from './Child.vue'

    const searchQuery = ref('') 
    const hasilPencarian = computed(() => {
        return listProduk.filter(item => 
        item.nama.toLowerCase().includes
        (searchQuery.value.toLowerCase()))
    })
    const listProduk = [
        { id: 1, nama: 'Printer', harga: 10000 },
        { id: 2, nama: 'Mouse', harga: 20000 },
        { id: 3, nama: 'Keyboard', harga: 30000 }
    ]
</script>
