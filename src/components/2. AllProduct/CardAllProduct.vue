<template> 
    <div class="group flex flex-row md:flex-col h-full bg-white border border-yellow-500 overflow-hidden shadow-sm hover:shadow-lg hover:scale-95 hover:border-blue-900 transition">
        <div 
            class="md:w-full w-[45%] aspect-square bg-cover bg-center" 
            :style="{ backgroundImage: `url(${listProduk.gambar?.[0]?.url})` }">
        </div>
        <div class="relative overflow-hidden group md:w-full w-[55%] px-4 py-8 md:p-4 flex flex-col item grow gap-3 md:pb-12">
            <div>
                <p class="font-semibold">{{ listProduk.nama }}</p>
                <p class="text-xs">mulai dari</p>
                <p class="font-bold text-base lg:text-lg">{{ formatRupiah(listProduk.harga_base) }}</p>
            </div> 
            <div class="absolute inset-x-0 bottom-0
                            translate-y-0
                            md:translate-y-full
                            md:group-hover:translate-y-0
                            transition-transform duration-300">
                <tombolBeli :dataProduk="listProduk" class="w-full justify-center" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import tombolBeli from './TombolBeli.vue'

    defineProps({
        listProduk: Object
    })
    
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    }

</script>