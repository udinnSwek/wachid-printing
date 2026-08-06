<template>
  <nav class="bg-yellow-400 px-8 overflow-x-auto whitespace-nowrap flex justify-center ">
      <router-link to="/" class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4">
        Home
      </router-link>
      <router-link to="/all-product" id="nav-all-product" class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4">
        All Product
      </router-link>
      <router-link to="/contact" class="text-black font-semibold transition hover:bg-yellow-500 hover:text-white p-4">
        Our Contact
      </router-link>
  </nav>
</template>
<script setup>
</script>