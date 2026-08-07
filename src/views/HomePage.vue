<template>
    <div>
        <SectionHero class="shadow-lg"/>
        <sectionSliderProduk />
        <sectionPreviewProduct :dataKatalog = "dataKatalog"/>
        <!-- <p>ini Halaman Home</p> -->
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { SupabaseClient } from '@supabase/supabase-js';
    import sectionPreviewProduct from '../components/1. Home/SectionPreviewProduct.vue'
    import sectionSliderProduk from '../components/1. Home/SectionSliderProduk.vue'
    import SectionHero from '../components/1. Home/SectionHero.vue';

    const dataKatalog = ref()

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
                    link_gambar,
                    gambar ( url )
                )
            `)

        if (error) {
            console.error("Gagal mengambil data katalog:", error.message)
        } else {
            console.log("Data berhasil diambil:", data)
            dataKatalog.value = data // Masukkan hasil query ke state kita
        }
        isLoading.value = false
    }
</script>