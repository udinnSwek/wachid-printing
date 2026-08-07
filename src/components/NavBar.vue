<template>
  <nav class="bg-yellow-400 px-8 overflow-x-auto whitespace-nowrap flex justify-center text-xs">
      <router-link to="/" 
      class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4"
      active-class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4 border-b-4 border-blue-900">
        Home
      </router-link>
      <router-link to="/all-product" id="nav-all-product" 
      class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4"
      active-class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4 border-b-4 border-blue-900">
        All Product
      </router-link>
      <router-link to="/about-us" 
      class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4"
      active-class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4 border-b-4 border-blue-900">
        About Us
      </router-link>
  </nav>
</template>
<script setup>
</script>