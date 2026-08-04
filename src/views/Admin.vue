<template>
  <!-- Pembungkus Utama (Satu layar penuh, flex row) -->
  <div class="flex h-screen bg-gray-50 font-sans text-gray-800">

    <!-- 1. SIDEBAR -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300">
      <!-- Logo Area -->
      <div class="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 class="text-xl font-extrabold text-teal-600 tracking-wider">KATALOGKU.</h1>
      </div>

      <!-- Menu Navigasi -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <!-- Menu Aktif -->
        <a href="#" class="flex items-center gap-3 px-4 py-3 bg-teal-50 text-teal-700 rounded-lg font-medium transition-colors">
          <span class="text-xl">📊</span> Overview
        </a>
        <!-- Menu Inaktif -->
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
          <span class="text-xl">📦</span> Kelola Produk
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
          <span class="text-xl">🏷️</span> Kategori
        </a>
      </nav>

      <!-- User Profile (Bottom Sidebar) -->
      <div class="p-4 border-t border-gray-200 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center font-bold text-white shadow-sm">
          AD
        </div>
        <div>
          <p class="text-sm font-bold text-gray-800">Admin Utama</p>
          <p class="text-xs text-gray-500">admin@katalog.com</p>
        </div>
      </div>
    </aside>

    <!-- 2. MAIN CONTENT AREA -->
    <main class="flex-1 flex flex-col overflow-hidden">

      <!-- Header Atas -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
        <h2 class="text-lg font-semibold text-gray-700">Dashboard Overview</h2>
        <div class="flex items-center gap-4">
          <!-- Dummy Search Bar -->
          <input 
            type="text" 
            placeholder="Cari sesuatu..." 
            class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
          >
        </div>
      </header>

      <!-- Konten Inti yang bisa di-scroll -->
      <div class="flex-1 overflow-y-auto p-8">

        <!-- A. Kartu Statistik (Grid Layout) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
            <span class="text-gray-500 text-sm font-medium">Total Produk</span>
            <span class="text-4xl font-black text-gray-800">100</span>
          </div>
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
            <span class="text-gray-500 text-sm font-medium">Kategori Aktif</span>
            <span class="text-4xl font-black text-gray-800">10</span>
          </div>
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
            <span class="text-gray-500 text-sm font-medium">Performa Database</span>
            <span class="text-4xl font-black text-green-500">Aman</span>
          </div>
        </div>

        <!-- B. Area Tabel (Tempat narik data dari Supabase) -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 class="font-bold text-lg text-gray-800">Manajemen Produk</h3>
            <button class="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
              + Tambah Produk Baru
            </button>
          </div>
          
          <!-- State Kosong / Placeholder Tabel -->
          <div class="p-12 flex flex-col items-center justify-center text-gray-400">
            <span class="text-5xl mb-4">📇</span>
            <p class="text-center">Tabel *fetch* dari Supabase akan dipasang di sini.<br>Kamu bisa nge-looping komponen tr/td menggunakan v-for nanti.</p>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>