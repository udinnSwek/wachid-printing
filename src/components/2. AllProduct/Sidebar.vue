<template>
  <div class="white rounded-lg max-w-md shadow-lg h-screen overflow-y-auto"> 
    <p class="text-4xl font-bold pl-5 py-10 mb-5 text-white bg-zinc-800">Kategori Produk</p>
    
    <!-- 1. Tambahkan v-model dan event @input -->
    <input 
        v-model="kataKunci"
        @input="$emit('searchProduk', kataKunci)"
        type="text" 
        placeholder="Filter produk..." 
        class="w-[95%] px-6 py-3 ml-4 bg-zinc-200 focus:outline-none rounded-full focus:border-yellow-400 transition"
    />
    
    <!-- 2. Ubah @click menjadi memanggil fungsi jalankanReset -->
    <button @click="viewAll" class="m-5 px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 cursor-pointer block font-semibold">
        view all
    </button>
    
    <div v-for="(kategori, index) in listProduk" :key="index" class="px-5">
      <!-- Tombol Accordion Tetap Sama -->
      <button 
        @click="kategoriAktif = (kategoriAktif === index ? null : index)"
        class="w-full text-left px-5 py-5 white border-zinc-400 flex rounded-lg justify-between items-center transition cursor-pointer hover:bg-zinc-200 last:border-b-0"
         :class="{
        'bg-zinc-800 hover:bg-zinc-600 text-white border-yellow-400 font-semibold': kategoriAktif === index,
        'bg-white hover:bg-zinc-200 border-zinc-400': kategoriAktif !== index
         }"
      >
      <span>{{ kategori.nama }}</span>
      <!-- (SVG Arrow Tetap Sama) -->
      <ChevronDownIcon
        class="w-5 h-5 transition-transform duration-300"
        :class="{ 'rotate-180': kategoriAktif === index }"
      />
      </button>

      <transition>
        <ul v-show="kategoriAktif === index" 
        class=" overflow-hidden -z-10">
            <!-- Panggil fungsi saat li diklik agar input teks juga otomatis bersih -->
            <li 
                v-for="(produk, i) in kategori.produk" :key="i" 
                @click="pilihProduk(produk.nama)"
                :class="[
                      'hover:pl-12 hover:py-5 ml-5 pl-10 py-3 border-l-2 cursor-pointer transition-all duration-200',
                      /* LOGIKA NYALA: Jika nama produk sama dengan yang terpilih, berikan class warna solid */
                      produkTerpilih === produk.nama 
                        ? 'text-zinc-800 bg-zinc-200 border-yellow-500 font-bold pl-14' 
                        : 'border-l border-yellow-400 hover:bg-zinc-200 text-zinc-700'
                    ]"
            >
                {{ produk.nama }}
            </li>   
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'

    defineProps({
        listProduk: {
            type: Array,
            default: () => []
        },
        produkTerpilih: {
            type: String,
            default: null
        }
    })

    // Daftarkan event searchProduk
    const emit = defineEmits(['filterProduk', 'resetFilter', 'searchProduk', 'closeSidebar'])

    const kategoriAktif = ref(null)
    const kataKunci = ref('') // Variabel untuk menyimpan input teks

    // Fungsi untuk mereset semua pencarian
    const jalankanReset = () => {
        kataKunci.value = '' // Kosongkan input
        emit('resetFilter')  // Beritahu parent untuk reset
        emit('closeSidebar') // Beritahu parent untuk menutup sidebar
    }

    // Fungsi ketika produk di-klik dari list
    const pilihProduk = (nama) => {
        kataKunci.value = '' // Kosongkan input agar tidak tabrakan
        emit('filterProduk', nama) // Beritahu parent produk apa yang diklik
        emit('closeSidebar') // Beritahu parent untuk menutup sidebar
    }

    const viewAll = () => {
    kategoriAktif.value = null
    jalankanReset()
    }
</script>