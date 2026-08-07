<template>
    <div name="cardCategory" 
        :class="['border border-blue-900 overflow-hidden shadow-sm flex flex-col justify-between',
        index % 2 === 0 ? 'bg-blue-900 border-blue-900' : 'bg-yellow-400 border-yellow-400']">
        <div class="
            h-[75%] bg-cover bg-center rounded-br-[16rem]" 
            :style="{ backgroundImage: `url('https://placehold.co/400x600?text=${dataKategori.nama.replace(/&/g, 'dan').replace(/\s+/g, '+')}')` }">
        </div>
        <div :class="['pb-6 pt-6 lg:pb-12 px-6 text-lg lg:text-2xl font-bold text-white',
            index % 2 === 0 ? 'text-white' : 'text-zinc-800'
        ]">
            <p>
                {{ dataKategori.nama }}
            </p>
        </div>
        
    </div>
</template>

<script setup>
    defineProps({
        dataKategori: Object,
        index: Number
    })
</script>
