<template>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div class="space-y-1 text-zinc-800 gap-6 font-serif tracking-normal font-semibold text-xl flex flex-row">
          <div class="flex flex-col justify-between gap-3">
            <p class="text-xl">
            Total Produk
          </p>
          <p class="text-xl">
            Jumlah Kategori
          </p>
          </div>
          <div class="flex flex-col gap-3">
            <p class="text-xl">: <strong class="text-yellow-600 font-sans">{{ produkFiltered.length }} / {{ dataProduk.length }}</strong> Produk</p>
            <p class="text-xl">: <strong class="text-yellow-600 font-sans">{{ jumlahKategori }} </strong> Kategori</p>
          </div>
        </div>
      <div class="flex flex-col gap-2 font-sans text-zinc-100 text-sm font-bold justify-between">
        <button 
          @click="$emit('openModalAdd')" 
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-sm shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Tambah Produk
        </button>
        <button 
            @click="$emit('openModalKategori')" 
            class="bg-blue-600 px-4 py-2 rounded-sm hover:bg-blue-800"
          >
          Tambah / Edit Kategori
        </button>
      </div>
      
    </div>  
</template>

<script setup>
    defineProps({
        produkFiltered: {
            type: Array,
            required: true
        },
        dataProduk: {
            type: Array,
            required: true
        },
        jumlahKategori: {
            type: Number,
            required: true
        }
    })

    defineEmits([
        'openModalAdd',
        'openModalKategori'
    ])
</script>