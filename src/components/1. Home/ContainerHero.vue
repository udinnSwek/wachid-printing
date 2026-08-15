<template>
    <div class="flex relative items-center overflow-hidden gap-0 2xl:gap-15">
        <div class="hidden xl:block">
            <div class="w-full pl-10 flex flex-col justify-center h-full gap-10">
                <div class="hidden xl:block">
                    <p class="font-semibold font-serif tracking-normal text-2xl xl:text-3xl text-yellow-50 my-6">Semua Keperluan <br> Percetakanmu ada di</p>  
                    <p class="font-black lg:text-8xl xl:text-9xl text-yellow-50 leading-[0.9]">Wachid Printing</p>
                </div>
                <router-link to="/all-product"
                class="bg-yellow-400 rounded-full py-3 px-6 hidden xl:block text-lg font-semibold w-fit hover:scale-105 hover:bg-yellow-500"
                >
                    Pesan Sekarang >    
                </router-link>
            </div>
        </div>

        <img :src="src"
        class="w-full h-full object-cover object-left 2xl:object-contain 2xl:object-right" 
        >
    </div>
</template>

<script setup>
    defineProps({
        src: String
    })
</script>