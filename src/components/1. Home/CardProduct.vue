<template>
    <div name="cardProduct" 
        :class="['bg-white h-full border border-blue-900 overflow-hidden shadow-sm flex flex-col hover:shadow-lg hover:scale-105 transition',
        index % 2 === 0? 'border-blue-900' : 'border-yellow-400'
        ]">
        <div class="w-full aspect-square bg-cover bg-center bg-zinc-200" :style="{ backgroundImage: `url(${dataProduk.gambar?.[0]?.url})` }"></div>
        <div class="p-4 flex flex-col grow justify-center">
            <p>{{ dataProduk.nama }}</p>
            <p class="font-bold text-base lg:text-lg">{{ formatRupiah(dataProduk.harga_base) }}</p>
        </div>   
    </div>
</template>

<script setup>
    defineProps({
        dataProduk: Object,
        index: Number
    })
    
    function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
    }
</script>
