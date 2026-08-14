<template>
    <div name="cardCategory" 
        :class="['border border-blue-900 overflow-hidden shadow-sm flex flex-col justify-between rounded-sm',
        index % 2 === 0 ? 'bg-blue-900 border-blue-900' : 'bg-yellow-400 border-yellow-400']">
        <div class=" hidden md:block
            h-[75%] bg-cover bg-center rounded-br-4" 
            :style="{ backgroundImage: `url('https://placehold.co/400x600?text=${dataKategori.nama.replace(/&/g, 'dan').replace(/\s+/g, '+')}')` }">
        </div>
        <div :class="['pb-6 pt-6 lg:pb-12 px-6 text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-white tracking-normal leading-none',
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
