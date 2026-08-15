<template> 
    <RouterLink
        :to="`/all-product/${listProduk.slug}`" 
        class="group flex flex-row md:flex-col h-full bg-white border border-yellow-500 overflow-hidden shadow-sm hover:shadow-lg hover:scale-95 hover:border-blue-900 transition rounded-sm">
        <div 
            class="md:w-full w-[45%] aspect-square bg-cover bg-center" 
            :style="{ backgroundImage: `url(${listProduk.gambar?.[0]?.url})` }">
        </div>
        <div class="relative overflow-hidden group md:w-full w-[55%] px-4 py-3 flex flex-col item grow md:px-6 md:py-3">    
            <div class="flex flex-col justify-between gap-2">
                <div>
                    <p class="text-xs text-zinc-400 hidden lg:block">{{listProduk.namaKategori}}</p>               
                    <p class="font-semibold font-serif text-base lg:text-lg">{{ listProduk.nama }}</p>
                </div>
                <div>
                    <p class="text-xs text-zinc-400">Mulai</p>
                    <p class="font-semibold text-base lg:text-lg font-serif pb-0 lg:pb-8">{{ formatRupiah(listProduk.harga_base) }}</p>
                </div>
            </div> 
            <div class="absolute inset-x-0 bottom-0
                            translate-y-0
                            md:translate-y-full
                            md:group-hover:translate-y-0
                            transition-transform duration-300">
                <tombolBeli :namaProduk="listProduk.nama" class="w-full justify-center" />
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
    import tombolBeli from '../TombolBeli.vue'

    defineProps({
        listProduk: Object,
        dataKatalog: Object
    })
    
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    }

</script>