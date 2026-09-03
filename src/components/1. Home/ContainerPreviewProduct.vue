<template>
        <div name="containerPreview" 
        v-for="(kategori, index) in dataYangDitampilkan" 
        :key="index" 
        :class="[
            'flex flex-col w-[80%] md:w-[80%] lg:w-[full] lg:max-w-300 gap-2 mx-auto',
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        ]">
                <cardCategory :dataKategori="kategori" class=" w-full md:aspect-square md:w-[40%]" :index ="index"/>
            <div name="cardContainer" class="w-full md:w-[60%] grid grid-cols-2 md:grid-cols-3 gap-2">
                <containerCardProduct :listProduk="kategori.produk" :index ="index"/>
            </div>
        </div>
        <div class="flex justify-center mt-8 mb-16">
            <button 
                @click="tampilkanSemua = !tampilkanSemua" 
                class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105"
            >
                <!-- Teks dinamis: berubah jadi "Sembunyikan" kalau sudah terbuka -->
                {{ tampilkanSemua ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Kategori' }}
            </button>
        </div>
</template>

<script setup>
    import { ref, computed, onMounted} from 'vue'

    import { supabase } from '../../supabaseClient.js'

    // import dataKatalog from '../../data/list-produk.json'
    import cardCategory from './CardCategory.vue'
    import containerCardProduct from './ContainerCardProduct.vue'

    const isLoading = ref()

    const fetchKatalog = async () => {
        // Query ini membaca tabel kategori, dan mengikutkan produk beserta gambarnya
        const { data, error } = await supabase
            .from('kategori')
            .select(`
                id,
                nama,
                url,
                produk (
                    id,
                    nama,
                    deskripsi,
                    harga_base,
                    slug,
                    gambar ( url )
                )
            `)
            .order('id', {ascending: true})

        if (error) {
            console.error("Gagal mengambil data katalog:", error.message)
        } else {
            dataKatalog.value = data
            // console.log(data)
        }
        isLoading.value = false
    }

    onMounted(() => {
        fetchKatalog()
    })

    const dataKatalog = ref([])

    // console.log(dataKatalog)
    
    const tampilkanSemua = ref(false)

    const dataYangDitampilkan = computed(() => {
        if (tampilkanSemua.value === true) {
            return dataKatalog.value
        } else {
            return dataKatalog.value.slice(0, 2) 
        }
    })
</script>
