<script setup>
import Header from './components/HeaderMain.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Coba from './components/BelajarComponent/coba.vue'
import Challenge from './components/BelajarVueGPT/challenge.vue'
import TombolWhatsApp from './components/TombolWhatsApp.vue'
import { supabase } from './supabaseClient.js';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <NavBar />
    <main>
      <router-view :key="$route.fullPath">
        
      </router-view>
    </main>
    <TombolWhatsApp/>
    <Footer class="mt-auto"/>
  </div>
</template>
