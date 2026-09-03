<template>
  <div class="white rounded-sm max-w-md shadow-lg h-screen overflow-y-auto gap-6"> 
    <p class="font-serif text-4xl font-semibold pl-5 py-10 text-zinc-800">Filter Produk</p>
    
    <!-- 1. Tambahkan v-model dan event @input -->
    <input 
        v-model="kataKunci"
        @input="$emit('searchProduk', kataKunci)"
        type="text" 
        placeholder="Mau nyari apa?" 
        class="w-[87%] px-6 py-3 ml-4 bg-zinc-200 focus:outline-none rounded-sm transition focus:ring-2 focus:ring-yellow-600"
    />
    
    <!-- 2. Ubah @click menjadi memanggil fungsi jalankanReset -->
    <button @click="viewAll" class="ml-4 my-6 px-6 py-3 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer block font-semibold">
        view all
    </button>

    <div>
        <p class="font-serif text-xl font-semibold pl-5 py-3 text-zinc-800">Pilih Kategori</p>
        <div v-for="(kategori, index) in listProduk" :key="index" class="px-5">
          <!-- Tombol Accordion Tetap Sama -->
            <button 
                @click="pilihKategori(kategori.nama, index)"
                class="w-full text-left text-zinc-600 px-5 py-5 white flex rounded-sm justify-between items-center transition cursor-pointer last:border-b-0 hover:bg-zinc-200"
                :class="{
                'bg-zinc-200 text-zinc-900 font-semibold': kategoriAktif === index,
                'bg-white border-zinc-400': kategoriAktif !== index
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
                            'hover:pl-12 hover:py-5 ml-5 pl-10 pr-3 py-3 border-l-2 cursor-pointer transition-all duration-200',
                            /* LOGIKA NYALA: Jika nama produk sama dengan yang terpilih, berikan class warna solid */
                            produkTerpilih === produk.nama 
                                ? 'text-zinc-800 bg-yellow-400 border-l-yellow-500 border-t-white font-bold pl-14' 
                                : 'border-l border-yellow-400 hover:bg-zinc-200 text-zinc-600'
                            ]"
                    >
                        {{ produk.nama }}
                    </li>   
                </ul>
            </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router';
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
    const emit = defineEmits(['filterProduk', 'resetFilter', 'searchProduk', 'closeSidebar','filterKategori'])

    const kategoriAktif = ref(null)
    const kataKunci = ref('') // Variabel untuk menyimpan input teks
    const router = useRouter()
    const route = useRoute()

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth' // 'smooth' untuk meluncur halus, 'auto' untuk instan
    })
}
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
        scrollToTop()
    }

    const pilihKategori = (namaKategori, index) => {
        if (kategoriAktif.value === index) {
            kategoriAktif.value = null;
            emit('filterKategori', null); // Kirim null untuk mereset filter
        } 
        // Jika user mengklik kategori lain (artinya ingin MEMBUKA)
        else {
            kategoriAktif.value = index;
            emit('filterKategori', namaKategori); // Kirim nama kategori untuk difilter
        }
    }

    const viewAll = () => {
    router.replace({ 
                path: route.path, // Tetap di rute saat ini (misal: /all-product)
                query: {}         // Kosongkan query-nya
            })

    kategoriAktif.value = null
    jalankanReset()
    }
</script>