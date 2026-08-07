<template>
    <div class="flex relative items-center overflow-hidden gap-0 2xl:gap-15">
        <div class="w-full lg:translate-x-80 xl:translate-x-0 xl:pl-10 flex flex-col justify-center h-full gap-10">
            <div class="hidden lg:block">
                <p class="font-bold text-3xl text-yellow-50">Semua Keperluan Percetakanmu ada di</p>  
                <p class="font-bold text-7xl text-yellow-50">Wachid Printing</p>
            </div>
            <router-link to="/all-product"
            class="bg-yellow-400 rounded-full py-3 px-6 hidden lg:block text-lg font-semibold w-fit hover:scale-105 hover:bg-yellow-500"
            >
                Pesan Sekarang >    
            </router-link>
        </div>

        <img :src="src"
        class="w-full h-full object-contain lg:translate-x-80 xl:translate-x-0" 
        >
    </div>
</template>

<script setup>
    defineProps({
        src: String
    })
</script>