<script setup>
import Header from './components/HeaderMain.vue'
import NavBar from './components/NavBar.vue'
import Coba from './components/BelajarComponent/coba.vue'
import Challenge from './components/BelajarVueGPT/challenge.vue'
import { supabase } from './supabaseClient.js';

async function checkSupabaseConnection() {
  console.log("Mencoba terhubung ke Supabase...");

  // Kita coba query ke tabel acak dengan limit 1
  const { data, error } = await supabase
    .from('testing_table')
    .select('*')

  if (error) {
    // Kalau error code-nya '42P01' (UndefinedTable), 
    // berarti KONEKSI BERHASIL masuk ke database, cuma tabelnya aja yang belum dibikin.
    if (error.code === '42P01') {
      console.log("✅ Koneksi SUKSES! (Supabase merespon, tapi tabel 'testing_table' belum ada)");
    } 
    // Kalau error code 'PGRST301' atau lainnya, biasanya berarti URL/Key salah atau masalah hak akses
    else {
      console.log("❌ Koneksi GAGAL atau ada masalah otentikasi:", error.message);
    }
  } else {
    // Kalau tidak ada error, berarti koneksi sukses dan tabelnya memang ada
    console.log("✅ Koneksi SUKSES! Berhasil baca data:", data);
  }
}

// Jalankan fungsinya
checkSupabaseConnection();
</script>

<template>
  <Header />
  <NavBar />
  <main class="">
    <router-view :key="$route.fullPath">
      
    </router-view>
  </main>
</template>
