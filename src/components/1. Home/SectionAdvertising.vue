<template>
    <section class="flex flex-col bg-yellow-400 pt-16 gap-6 overflow-x-hidden">
        <div class="flex flex-col px-6 gap-6 w-full lg:w-200 lg:mx-auto">
            <p class="text-3xl lg:text-6xl font-serif font-semibold text-center text-zinc-800">Kebutuhan Anda Lebih dari Sekadar Cetak?</p>
            <p class="text-base lg:text-xl text-center text-zinc-800">
                Kami siap menangani berbagai kebutuhan <b>advertising</b> dan <b>brand execution</b>, mulai dari <b>branding kendaraan, kebutuhan event, hingga produksi dan instalasi di lokasi.</b>
            </p>
        </div>

        <AdvertisingSlider class="" />
        <AdvertisingSlider class="block lg:hidden -mt-30" reverse/>

        <div class="flex justify-center relative">
            <div class="relative flex justify-center">

                <div class="bg-blue-800 w-[90%] h-[90%] lg:w-[73%] lg:h-[90%] absolute -top-10 rounded-b-2xl"></div>
                <img src="../../assets/Booth.png" alt="BoothIllustration"
                    class="max-w-none w-[110%] -ml-5 -mt-50 lg:w-[80%] md:max-w-7xl relative z-50"
                >
            </div>
        </div>
    </section>
    <section class="flex flex-col py-16 gap-6 bg-white">
        <p class="text-3xl lg:text-6xl font-serif font-semibold text-center text-zinc-800 tracking-normal">Klien Kami</p>
        <div class="flex flex-row gap-2 justify-center">
            <div v-for="(logo, index) in logoClient" class="aspect-square w-25 p-3 shadow-md rounded-md border border-yellow-400">
                <img :src="logo" alt="logo-client" class="rounded-md">
            </div>
        </div>
    </section>
    <section>
        <div class="relative flex flex-col items-center py-12.5 bg-linear-to-t from-yellow-200 from-0% to-white to-35% overflow-clip">
            <img src="../../assets/cta-img/img (1).png" alt="" 
                class="absolute -bottom-70 -right-20 h-100 w-100
                    lg:w-200 lg:h-200 lg:-bottom-120 lg:-right-80
                    2xl:-right-20">
                
            <img src="../../assets/cta-img/img (2).png" alt="" 
                class="absolute top-25 -right-25 h-50 w-50
                    md:-right-10
                    lg:w-100 lg:h-100 lg:-top-10 lg:-right-50
                    2xl:right-0">

            <img src="../../assets/cta-img/img (3).png" alt="" 
                class="absolute -bottom-40 -left-8 -rotate-16 h-80 w-80 
                    lg:-bottom-100 lg:-left-100 lg:w-200 lg:h-200
                    2xl:-left-40">

            <img src="../../assets/cta-img/img (4).png" alt="" 
                class="absolute top-1 -left-35 w-60 h-60 
                    md:-left-20
                    lg:w-100 lg:h-100 lg:-left-50 lg:-top-10
                    2xl:left-0">

                    
            <div class="flex flex-col gap-4 w-[60%] max-w-180">
                <p class="text-3xl lg:text-6xl font-serif font-semibold text-center text-zinc-800">Realisasikan Konsep <br> Campaign Anda.</p>
                <p class="text-sm lg:text-xl text-center text-zinc-800">Bawa brand brief Anda, dan serahkan tahap produksinya kepada kami. Kami memastikan setiap turunan desain dieksekusi dengan presisi dan standar teknis yang tinggi.</p>
            </div>
            <button class="flex flex-row items-center my-16 leading-0 w-fit text-base lg:text-2xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105 gap-2 cursor-pointer">
                <PhoneIcon class="w-6 h-6" />Konsultasi Sekarang <ArrowRightIcon class="w-6 h-6" />
            </button>
        </div>
    </section>
</template>

<script setup>
    import { ArrowRightIcon, PhoneIcon } from "@heroicons/vue/16/solid"
    import logo1 from "../../assets/logo-client/logo-1.jpg"
    import logo2 from "../../assets/logo-client/logo-2.jpg"

    const logoClient = [logo1, logo2]

    import AdvertisingSlider from './AdvertisingSlider.vue'
</script>