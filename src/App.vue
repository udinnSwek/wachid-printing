<script setup>
import Header from './components/HeaderMain.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Coba from './components/BelajarComponent/coba.vue'
import Challenge from './components/BelajarVueGPT/challenge.vue'
import { supabase } from './supabaseClient.js';

</script>

<template>
  <Header />
  <NavBar />
  <main class="">
    <router-view :key="$route.fullPath">
      
    </router-view>
  </main>
  <Footer />
</template>
