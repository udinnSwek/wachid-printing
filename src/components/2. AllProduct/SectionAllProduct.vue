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
            ☰ Filter Produk
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
            @filterKategori="filterKategori"
        />
        
        <paginationCardProduk class="w-full md:w-[65%]" :semuaProduk="produkYangDitampilkan" :dataKatalog="dataKatalog" :kataKunci="kataKunci" :isLoading="isLoading"/>
    </section>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import { supabase } from '../../supabaseClient.js'
    import { useRoute } from 'vue-router'

    // import dataKatalog from '../../data/list-produk.json'
    import sidebar from './Sidebar.vue'
    import paginationCardProduk from './PaginationCardProduk.vue'

    // 4. Ubah dataKatalog menjadi variabel reaktif kosong
    const dataKatalog = ref([])
    const isLoading = ref(false) // Opsional: Untuk status loading

    // 5. Buat fungsi untuk mengambil data relasional dari Supabase
    const fetchKatalog = async () => {
        isLoading.value = true
        // Query ini membaca tabel kategori, dan mengikutkan produk beserta gambarnya
        const { data, error } = await supabase
            .from('kategori')
            .select(`
                id,
                nama,
                produk (
                    id,
                    nama,
                    deskripsi,
                    harga_base,
                    slug,
                    gambar ( url )
                )
            `)
            .order('id', {ascending:true})

        if (error) {
            console.error("Gagal mengambil data katalog:", error.message)
        } else {
            dataKatalog.value = data // Masukkan hasil query ke state kita
        }
        isLoading.value = false
    }

    const route = useRoute()

    // 6. Jalankan fetchKatalog saat komponen dimuat di layar
    onMounted(() => {
        fetchKatalog()
    })

    onMounted(() => {
        // 1. Cek apakah ada titipan pesan 'kategori' di URL
        const kategoriDariUrl = route.query.kategori
        
        if (kategoriDariUrl) {
            // 2. Jika ada, langsung set state kategori kita dengan nama tersebut!
            selectedKategori.value = kategoriDariUrl
        }
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
    const selectedKategori= ref(null)
    const kataKunci = ref('') // Tambahkan state untuk menyimpan ketikan user
    const sidebarAktif = ref(false) // State untuk mengontrol sidebar

    // 1. Saat klik produk dari List Accordion
    const filterProduk = (namaProduk) => {
        selectedProduk.value = semuaProduk.value.find(produk => produk.nama === namaProduk)
        selectedKategori.value = null // (Opsional) Reset kategori agar tidak bertabrakan
        kataKunci.value = '' 
    }

    const filterKategori = (namaKategori) => {
        selectedKategori.value = namaKategori
        selectedProduk.value = null // Reset produk agar muncul semua isi kategori
        kataKunci.value = ''
        console.log(selectedKategori.value)
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
        // 1. Prioritas Pertama: Jika user mencari via teks
        if (kataKunci.value) {
            return semuaProduk.value.filter(p => 
                p.nama.toLowerCase().includes(kataKunci.value.toLowerCase())
            )
        }

        // 2. Prioritas Kedua: Jika user mengklik 1 produk spesifik
        if (selectedProduk.value) {
            return [selectedProduk.value] // Dibungkus array agar tetap bisa di-loop v-for
        }

        // 3. Prioritas Ketiga: Jika user memilih kategori dari dropdown
        if (selectedKategori.value) {
            return semuaProduk.value.filter(p => p.namaKategori === selectedKategori.value)
        }

        // 4. Default: Jika tidak ada filter yang aktif, tampilkan semua
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