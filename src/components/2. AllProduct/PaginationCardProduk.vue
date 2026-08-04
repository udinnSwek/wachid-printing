<template>
    <div class="flex flex-col">
        <div class="flex justify-center items-center gap-4 mt-4">
            <button @click="halamanSaatIni--" :disabled="halamanSaatIni <= 1">
                <
            </button>

            <nomorHalaman v-for="angkaHalaman in angkaUrut" :key="angkaHalaman" :angkaHalaman="angkaHalaman" :halamanSaatIni="halamanSaatIni" @pindahHalaman="pindahHalaman"/>
            
            <button @click="halamanSaatIni++" :disabled="halamanSaatIni >= jumlahMaxHalaman || jumlahMaxHalaman === 0">
                >
            </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <cardAllProduct v-for="(produk, index) in listProdukTerbatas" :key="index" :listProduk="produk" />
        </div>
    </div>
</template>

<script setup>
    // Tambahkan 'watch' dari vue
    import { computed, ref, watch } from 'vue'

    import cardAllProduct from './CardAllProduct.vue'
    import nomorHalaman from './NomorHalaman.vue'

    const props = defineProps({
        semuaProduk: {
            type: Array,
            default: () => [] // Cara yang lebih aman untuk memberikan nilai default pada props Array
        }
    })

    const halamanSaatIni = ref(1);
    const batasProduk = 24;

    const jumlahMaxHalaman = computed(() => {
        // Langsung panggil props.semuaProduk di dalam computed
        return Math.ceil(props.semuaProduk.length / batasProduk);
    });

    const listProdukTerbatas = computed(() => {
        const batasBawah = (halamanSaatIni.value - 1) * batasProduk;
        const batasAtas = batasBawah + batasProduk;

        // Langsung gunakan props.semuaProduk
        return props.semuaProduk.slice(batasBawah, batasAtas);
    });

    const angkaUrut = computed(() => {
        return Array.from(
            { length: jumlahMaxHalaman.value },
            (_, i) => i + 1
        )
    })

    const pindahHalaman = (angkaHalaman) => {
        halamanSaatIni.value = angkaHalaman;
    };

    // TAMBAHAN PENTING: 
    // Setiap kali props.semuaProduk berubah (misal karena user nge-klik filter),
    // kembalikan halaman ke 1.
    watch(() => props.semuaProduk, () => {
        halamanSaatIni.value = 1;
    });

</script>