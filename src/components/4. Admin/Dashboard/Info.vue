<template>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 w-full">
      <div class="space-y-1 text-zinc-800 gap-6 font-serif tracking-normal font-semibold text-lg lg:text-xl flex flex-row">
        <div class="flex flex-col justify-between gap-3">
          <p>
          Total Produk
        </p>
        <p>
          Jumlah Kategori
        </p>
        </div>

        <div class="flex flex-col gap-3">
          <p>: <strong class="text-yellow-600 font-sans">{{ produkFiltered.length }} / {{ dataProduk.length }}</strong> Produk</p>
          <p>: <strong class="text-yellow-600 font-sans">{{ jumlahKategori }} </strong> Kategori</p>
        </div>
      </div>

      <div class="flex flex-row md:flex-col gap-2 font-sans text-zinc-100 text-sm font-bold justify-between self-end md:self-auto">
        <button 
          @click="$emit('openModalAdd')" 
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-sm shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Tambah Produk
        </button>
        <button 
            @click="$emit('openModalKategori')" 
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-sm shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
