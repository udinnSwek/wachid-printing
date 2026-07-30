<!-- src/components/Navbar.vue -->
<template>
  <!-- sticky top-0 dan z-50 membuat navbar tetap di atas saat discroll -->
  <header class="bg-gray-900 sticky top-0 z-50 shadow-md">
    <nav class="max-w-7xl mx-auto px-8 py-3 flex justify-center overflow-x-auto whitespace-nowrap">
      
      <!-- Looping data menu agar tidak perlu copy-paste tag <a> -->
      <a 
        v-for="menu in menuList" 
        :key="menu.id"
        :href="menu.href" 
        class="text-white font-semibold hover:text-gray-300 transition hover:bg-blue-700 px-4 py-2 mx-1 rounded-lg"
      >
        {{ menu.name }}
      </a>

    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

// Menyimpan daftar menu sebagai data dinamis (Reactivity)
const menuList = ref([
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'All Product', href: '#all-product' },
  { id: 3, name: 'Our Contact', href: '#contact' }
])
</script>