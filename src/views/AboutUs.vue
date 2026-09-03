<template>
    <div class="flex justify-center w-full">
        <!-- Paste seluruh kode <blockquote> dari Instagram di bawah ini -->
        <blockquote 
        class="instagram-media" 
        data-instgrm-permalink="https://www.instagram.com/p/DY4eZDAiYRI/?igsi=MzRlODBiNWFlZA==/?utm_source=ig_embed" 
        data-instgrm-version="14">
        <!-- Isi blockquote panjang dari IG... -->
        </blockquote>
    </div>
</template>
  
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Mengecek apakah script Instagram sudah pernah dimuat di halaman
  if (window.instgrm) {
    // Jika sudah ada (misal user balik lagi ke halaman ini), proses ulang blockquote-nya
    window.instgrm.Embeds.process()
  } else {
    // Jika belum ada, buat tag script dan suntikkan ke DOM
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }
})
</script>
