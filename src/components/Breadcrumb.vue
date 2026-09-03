<template>
  <nav v-if="route.path !== '/'" class="flex py-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      
      <!-- Link Statis ke Beranda -->
      <li class="inline-flex items-center">
        <router-link to="/" class="text-xs md:text-sm font-medium text-yellow-600 hover:text-blue-600">
          Beranda
        </router-link>
      </li>

      <!-- Looping hasil pemecahan URL -->
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <div class="flex items-center">
          <svg class="w-3 h-3 text-yellow-600 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          
          <!-- Halaman terakhir (aktif), tidak bisa diklik -->
          <span v-if="index === breadcrumbs.length - 1" class="ml-1 text-xs md:text-sm font-semibold text-blue-900 md:ml-2">
            {{ crumb.name }}
          </span>
          
          <!-- Halaman di tengah (seperti All Product), bisa diklik -->
          <router-link v-else :to="crumb.path" class="ml-1 text-xs md:text-sm font-medium text-yellow-600 hover:text-yellow-400 md:ml-2">
            {{ crumb.name }}
          </router-link>
        </div>
      </li>

    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 1. Buat kamus untuk menerjemahkan path statis menjadi bahasa yang rapi
const kamusNama = {
  'all-product': 'Semua Produk',
  'about-us': 'Tentang Kami',
  'admin': 'Dashboard Admin',
  'login': 'Masuk'
}

const breadcrumbs = computed(() => {
  // 2. Pecah URL berdasarkan garis miring '/'
  // Contoh: '/all-product/baju-merah' menjadi array ['all-product', 'baju-merah']
  const pathArray = route.path.split('/').filter(p => p)

  let currentPath = ''
  const crumbs = []

  pathArray.forEach((pathSegment) => {
    // Bangun ulang path-nya untuk link (misal: /all-product, lalu /all-product/baju-merah)
    currentPath += `/${pathSegment}`

    // 3. Cek apakah segmen ini ada di kamus
    let name = kamusNama[pathSegment]

    // 4. Jika tidak ada di kamus, berarti ini adalah SLUG produk!
    if (!name) {
      // Ubah slug 'baju-merah-keren' menjadi 'Baju Merah Keren'
      name = pathSegment
        .replace(/-/g, ' ') // Ganti strip dengan spasi
        .replace(/\b\w/g, char => char.toUpperCase()) // Kapitalisasi huruf pertama
    }

    crumbs.push({
      path: currentPath,
      name: name
    })
  })

  return crumbs
})
</script>