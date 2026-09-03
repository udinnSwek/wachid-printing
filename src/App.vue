<script setup>
import Header from './components/HeaderMain.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import TombolWhatsApp from './components/TombolWhatsApp.vue'
import Breadcrumb from './components/Breadcrumb.vue'

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <NavBar />
    <main class="flex-1">
      <Breadcrumb class="px-10 md:px-[12.5%] shadow-md" />
      <router-view :key="$route.fullPath">
        
      </router-view>
    </main>
    <TombolWhatsApp/>
    <Footer class="mt-auto"/>
  </div>
</template>
