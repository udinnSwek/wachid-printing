<template>
    <div name="cardCategory" class="bg-white border border-yellow-400 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
        <div class="
            h-[75%] bg-cover bg-center rounded-br-[16rem]" 
            :style="{ backgroundImage: `url('https://placehold.co/400x600?text=${dataKategori.nama.replace(/&/g, 'dan').replace(/\s+/g, '+')}')` }">
        </div>
        <div class="pb-6 pt-6 lg:pb-12 px-6 text-lg lg:text-xl font-bold bg-white">
            <p>
                {{ dataKategori.nama }}
            </p>
        </div>
        
    </div>
</template>

<script setup>
    defineProps({
        dataKategori: Array
    })
</script>
