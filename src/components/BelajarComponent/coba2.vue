<template>
    <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl mx-auto bg-amber-400 rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-200 overflow-hidden mb-6">
        
        <img class="w-full md:w-1/2 object-cover" :src="item.link_gambar" :alt="item.id" />
        
        <div class="p-6 w-full md:w-1/2 flex flex-col justify-center">
            <!-- Menerima props namaKategori -->
            <p class="text-sm">{{ namaKategori }}</p>
            <p class="font-bold text-lg mt-1">{{ item.nama }}</p>
            
            <p class="font-bold text-xl mb-4">{{ formatRupiah(item.harga * jumlah_barang) }}</p>
            
            <div class="flex items-center justify-between w-32 bg-amber-500 rounded">
              <button class="font-bold cursor-pointer hover:text-white hover:bg-amber-700 px-4 py-2 rounded" @click="kurangBarang">-</button>
              <p class="font-bold">{{ jumlah_barang }}</p>
              <button class="font-bold cursor-pointer hover:text-white hover:bg-amber-700 px-4 py-2 rounded" @click="tambahBarang">+</button>
            </div>
        </div>
    </div>
</template>

<script setup>
// 1. Letakkan IMPORT selalu di posisi paling atas
import { ref } from 'vue';

// 2. Terima spesifik 1 produk (item) dan nama kategorinya
defineProps({
    item: {
        type: Object,
        required: true
    },
    namaKategori: {
        type: String,
        required: true
    }
});

// 3. State & Fungsi (Masing-masing produk punya sendiri)
const jumlah_barang = ref(1);

function tambahBarang() {
    jumlah_barang.value++;
}

function kurangBarang() {
    if (jumlah_barang.value > 1) {
        jumlah_barang.value--;
    }
}

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}
</script>