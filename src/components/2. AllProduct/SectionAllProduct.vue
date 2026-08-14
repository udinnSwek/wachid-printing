<template>
    <div
        v-if="sidebarAktif"
        @click="sidebarAktif = false"
        class="fixed inset-0 bg-black/40 z-40"
    ></div>
    <section class="flex flex-col py-10 md:flex-row gap-4 justify-center pl-8 pr-4 text-xs md:text-base">
        <!-- Tangkap event searchProduk dari input teks Sidebar -->
         <button
            class="md:hidden px-5 py-3 bg-yellow-400 rounded w-fit font-semibold"
            @click="sidebarAktif = true"
        >
            ☰ Pilih Produk
        </button>
        <sidebar 
            :listProduk="dataKatalog"
            :produkTerpilih="selectedProduk ? selectedProduk.nama : null"
            
            :class="[
                'bg-white z-50 transition-transform duration-300',
                'fixed top-0 left-0 h-screen w-[70%] md:static md:h-fit md:w-[35%] md:pb-5',
                sidebarAktif
                    ? 'translate-x-0'
                    : '-translate-x-full md:translate-x-0'
            ]"

            @closeSidebar="sidebarAktif = false"

            @filterProduk="filterProduk"
            @resetFilter="resetFilter"
            @searchProduk="handleSearch"
        />
        
        <paginationCardProduk class="w-full md:w-[65%]" :semuaProduk="produkYangDitampilkan" :dataKatalog="dataKatalog"/>
    </section>
</template>

<script setup>
    import { supabase } from '../../supabaseClient.js'

    import { ref, computed, watch, onMounted } from 'vue'

    // import dataKatalog from '../../data/list-produk.json'
    import sidebar from './Sidebar.vue'
    import cardAllProduct from './CardAllProduct.vue'
    import paginationCardProduk from './PaginationCardProduk.vue'

    // 4. Ubah dataKatalog menjadi variabel reaktif kosong
    const dataKatalog = ref([])
    const isLoading = ref(true) // Opsional: Untuk status loading

    // 5. Buat fungsi untuk mengambil data relasional dari Supabase
    const fetchKatalog = async () => {
        // Query ini membaca tabel kategori, dan mengikutkan produk beserta gambarnya
        const { data, error } = await supabase
            .from('kategori')
            .select(`
                id,
                nama,
                produk (
                    id,
                    kode_produk,
                    nama,
                    deskripsi,
                    harga_base,
                    slug,
                    gambar ( url )
                )
            `)

        if (error) {
            console.error("Gagal mengambil data katalog:", error.message)
        } else {
            dataKatalog.value = data // Masukkan hasil query ke state kita
        }
        isLoading.value = false
    }

    // 6. Jalankan fetchKatalog saat komponen dimuat di layar
    onMounted(() => {
        fetchKatalog()
    })

    // 7. Sesuaikan computed semuaProduk agar membaca dari .value
    const semuaProduk = computed(() => {
        // Cegah error flatMap jika dataKatalog masih kosong saat pertama kali load
        if (!dataKatalog.value || dataKatalog.value.length === 0) return []
        
        return dataKatalog.value.flatMap(kategori => {
            return kategori.produk.map(produk => ({
                ...produk,                            // Ambil semua data produk yang ada
                namaKategori: kategori.nama  // Tambahkan key baru. (Sesuaikan 'nama_kategori' dengan key asli di data Anda)
                }))
        })
        .sort((a, b) => a.id - b.id)
    })

    const selectedProduk = ref(null)
    const kataKunci = ref('') // Tambahkan state untuk menyimpan ketikan user
    const sidebarAktif = ref(false) // State untuk mengontrol sidebar

    // 1. Saat klik produk dari List Accordion
    const filterProduk = (namaProduk) => {
        selectedProduk.value = semuaProduk.value.find(produk => produk.nama === namaProduk)
        kataKunci.value = '' // Matikan filter teks jika user memilih dari list
    }

    // 2. Saat klik tombol 'view all'
    const resetFilter = () => {
        selectedProduk.value = null
        kataKunci.value = ''
    }

    // 3. Saat user mengetik di input teks (fitur baru)
    const handleSearch = (keyword) => {
        kataKunci.value = keyword
        selectedProduk.value = null // Matikan filter list jika user mulai mengetik
    }

    // Asisten pintar yang menentukan data final yang dikirim ke Pagination
    const produkYangDitampilkan = computed(() => {
        
        // A. Jika ada produk yang diklik spesifik dari sidebar (via <li>)
        if (selectedProduk.value !== null) {
            return [selectedProduk.value]
        }
        
        // B. Jika user sedang mengetik sesuatu di input box (filter berdasarkan huruf)
        if (kataKunci.value.trim() !== '') {
            return semuaProduk.value.filter(produk => 
                // toLowerCase() memastikan pencarian tidak peduli huruf besar/kecil
                produk.nama.toLowerCase().includes(kataKunci.value.toLowerCase())
            )
        }
        
        // C. Jika null dan input teks kosong, tampilkan semuanya
        return semuaProduk.value
    })

        watch(sidebarAktif, (value) => {
            if (value) {
                document.body.classList.add('overflow-hidden')
            } else {
                document.body.classList.remove('overflow-hidden')
            }
    })

</script>