<template>
    <button 
        :class="[
            'w-8 h-8 flex items-center justify-center rounded font-semibold transition-colors duration-200', // Class dasar (selalu dipakai)
            angkaHalaman === halamanSaatIni ? 'bg-yellow-400 text-black' : 'bg-zinc-200 text-gray-600 hover:bg-zinc-300' // Kondisi aktif vs tidak aktif
        ]"
        @click="$emit('pindahHalaman', angkaHalaman)"
    >
        {{ angkaHalaman }}
    </button>
</template>

<script setup>
    const props = defineProps({
        angkaHalaman: Number,
        halamanSaatIni: Number
    })
</script>