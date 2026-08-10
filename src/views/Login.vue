<template>

  <!-- Background Layar Penuh -->
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-800">
    
    <!-- Kotak Login (Card) -->
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      <!-- Bagian Header/Logo -->
      <div class="p-8 pb-6 text-center bg-white border-b border-gray-100">
        <h1 class="text-3xl font-extrabold text-teal-600 tracking-wider mb-2">KATALOGKU.</h1>
        <p class="text-gray-500 text-sm">Silakan masuk ke panel admin</p>
      </div>

      <!-- Bagian Form -->
      <div class="p-8 pt-6">
        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <!-- Input Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@katalog.com"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 transition-all"
              required
            >
          </div>

          <!-- Input Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 transition-all"
              required
            >
          </div>

          <!-- Checkbox Ingat Saya & Lupa Password -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 cursor-pointer text-gray-600">
              <input type="checkbox" class="rounded text-teal-600 focus:ring-teal-500 border-gray-300">
              <span>Ingat saya</span>
            </label>
            <a href="#" class="text-teal-600 hover:text-teal-700 font-medium transition-colors">Lupa Password?</a>
          </div>

          <!-- Tombol Login -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm"
          >
            <span v-if="isLoading">Memproses...</span>
            <span v-else>Masuk ke Dashboard</span>
            
            <!-- Icon Panah (Sembunyikan saat loading) -->
            <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z" clip-rule="evenodd" transform="rotate(180 10 10)" />
            </svg>
          </button>

        </form>
      </div>
      
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
// PENTING: Sesuaikan path ini dengan lokasi file inisialisasi Supabase kamu
// Misalnya jika file-nya bernama supabase.js dan ada di folder src/
import { supabase } from '../supabaseClient'; 

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  
  try {
    // 1. Memanggil fungsi autentikasi Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    // 2. Jika email/password salah, lemparkan pesan error
    if (error) throw error;

    // 3. Jika login sukses, arahkan ke halaman dashboard admin
    window.location.href = '/admin'; 

  } catch (error) {
    // Menampilkan pesan error dari Supabase ke pengguna
    alert("Login gagal: " + error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>