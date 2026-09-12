<template>
    <section class="bg-zinc-50 px-5 py-14 text-zinc-800 sm:px-8 lg:px-12">
        <div class="mx-auto flex w-full max-w-300 flex-col gap-8">
            <div class="flex items-end justify-between gap-4">
                <div>
                    <p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-800">Produk Pilihan</p>
                    <h2 class="font-serif text-3xl font-semibold tracking-normal sm:text-4xl">Temukan Produk untuk Kebutuhan Anda</h2>
                </div>

                <div v-if="jumlahHalaman > 1" class="hidden shrink-0 gap-2 sm:flex">
                    <button
                        type="button"
                        aria-label="Produk sebelumnya"
                        :disabled="halamanAktif === 0"
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-blue-800 text-blue-800 transition hover:bg-blue-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                        @click="halamanSebelumnya"
                    >
                        <ChevronLeftIcon class="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="Produk berikutnya"
                        :disabled="halamanAktif === jumlahHalaman - 1"
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-blue-800 text-blue-800 transition hover:bg-blue-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                        @click="halamanBerikutnya"
                    >
                        <ChevronRightIcon class="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div v-if="isLoading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="nomor in cardsPerView" :key="nomor" class="aspect-[0.8] animate-pulse rounded-sm bg-zinc-200"></div>
            </div>

            <div v-else-if="produkSlider.length" class="overflow-hidden" @mouseenter="berhentiAutoplay" @mouseleave="mulaiAutoplay">
                <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${halamanAktif * 100}%)` }">
                    <div v-for="(halaman, halamanIndex) in halamanProduk" :key="halamanIndex" class="flex min-w-full gap-3 sm:gap-4">
                        <CardProduct
                            v-for="(produk, produkIndex) in halaman"
                            :key="produk.id"
                            :dataProduk="produk"
                            :index="produkIndex"
                            class="min-w-0"
                            :style="{ flex: `0 0 calc((100% - ${(cardsPerView - 1) * 1}rem) / ${cardsPerView})` }"
                        />
                    </div>
                </div>
            </div>

            <div v-else class="rounded-lg bg-white py-12 text-center text-zinc-500 shadow-sm">
                Produk pilihan belum tersedia.
            </div>

            <div v-if="jumlahHalaman > 1" class="flex items-center justify-center gap-2">
                <button
                    v-for="(_, index) in halamanProduk"
                    :key="index"
                    type="button"
                    :aria-label="`Buka halaman produk ${index + 1}`"
                    :aria-current="halamanAktif === index ? 'page' : undefined"
                    :class="['h-2 rounded-full transition-all', halamanAktif === index ? 'w-7 bg-yellow-400' : 'w-2 bg-zinc-300 hover:bg-blue-800']"
                    @click="pindahKeHalaman(index)"
                ></button>
            </div>

            <div class="flex justify-center sm:hidden" v-if="jumlahHalaman > 1">
                <div class="flex gap-2">
                    <button type="button" aria-label="Produk sebelumnya" :disabled="halamanAktif === 0" class="rounded-full bg-blue-800 p-2 text-white disabled:opacity-30" @click="halamanSebelumnya">
                        <ChevronLeftIcon class="h-5 w-5" />
                    </button>
                    <button type="button" aria-label="Produk berikutnya" :disabled="halamanAktif === jumlahHalaman - 1" class="rounded-full bg-blue-800 p-2 text-white disabled:opacity-30" @click="halamanBerikutnya">
                        <ChevronRightIcon class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { supabase } from '../../supabaseClient.js'
import CardProduct from './CardProduct.vue'

const produkSlider = ref([])
const isLoading = ref(true)
const halamanAktif = ref(0)
const cardsPerView = ref(1)
let autoplayTimer

const jumlahHalaman = computed(() => Math.ceil(produkSlider.value.length / cardsPerView.value))
const halamanProduk = computed(() => {
    const halaman = []
    for (let index = 0; index < produkSlider.value.length; index += cardsPerView.value) {
        halaman.push(produkSlider.value.slice(index, index + cardsPerView.value))
    }
    return halaman
})

const ubahJumlahKartu = () => {
    const lebar = window.innerWidth
    cardsPerView.value = lebar >= 1024 ? 4 : lebar >= 640 ? 3 : 2
}

const fetchProduk = async () => {
    const { data, error } = await supabase
        .from('produk')
        .select('id, nama, deskripsi, harga_base, slug, gambar ( url )')
        .order('id', { ascending: true })
        .limit(12) 
        //untuk saat ini masih dibatasi 12 produk saja, karena ini untuk slider produk pilihan, 
        //untuk revisi kemungkinan akan diubah menjadi produk yang memiliki flag "pilihan" di database, sehingga tidak dibatasi 12 produk saja

    if (error) console.error('Gagal mengambil produk slider:', error.message)
    produkSlider.value = data ?? []
    isLoading.value = false
}

const halamanSebelumnya = () => {
    if (halamanAktif.value > 0) halamanAktif.value--
}

const halamanBerikutnya = () => {
    if (halamanAktif.value < jumlahHalaman.value - 1) halamanAktif.value++
}

const pindahKeHalaman = (index) => {
    halamanAktif.value = index
}

const mulaiAutoplay = () => {
    berhentiAutoplay()
    if (jumlahHalaman.value > 1) {
        autoplayTimer = window.setInterval(() => {
            halamanAktif.value = halamanAktif.value === jumlahHalaman.value - 1 ? 0 : halamanAktif.value + 1
        }, 5000)
    }
}

const berhentiAutoplay = () => {
    if (autoplayTimer) window.clearInterval(autoplayTimer)
}

watch(cardsPerView, () => {
    halamanAktif.value = Math.min(halamanAktif.value, Math.max(jumlahHalaman.value - 1, 0))
})

onMounted(() => {
    ubahJumlahKartu()
    window.addEventListener('resize', ubahJumlahKartu)
    fetchProduk().then(mulaiAutoplay)
})

onBeforeUnmount(() => {
    berhentiAutoplay()
    window.removeEventListener('resize', ubahJumlahKartu)
})
</script>
