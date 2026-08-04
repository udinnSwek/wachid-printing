<template> 
    <div class="group flex flex-row md:flex-col h-full border border-yellow-400 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition">
        <div 
            class="md:w-full w-[45%] aspect-square bg-cover bg-center" 
            :style="{ backgroundImage: `url(${listProduk.gambar?.[0]?.url})` }">
        </div>
        <div class="md:w-full w-[55%] px-4 py-8 md:p-4 flex flex-col item grow gap-16 md:gap-3 justify-between">
            <div>
                <p>{{ listProduk.nama }}</p>
                <p class="font-bold text-base lg:text-lg">{{ formatRupiah(listProduk.harga_base) }}</p>
            </div>   
            <tombolBeli :dataProduk="listProduk" class="w-full justify-end" />
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