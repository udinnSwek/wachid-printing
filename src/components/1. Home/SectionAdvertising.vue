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
    <section class="flex flex-col py-16 gap-6">
        <p class="text-3xl lg:text-6xl font-serif font-semibold text-center text-zinc-800 tracking-normal">Klien Kami</p>
        <div class="flex flex-row gap-2 justify-center">
            <div v-for="(logo, index) in logoClient" class="aspect-square w-25 p-3 shadow-md rounded-md border border-yellow-400">
                <img :src="logo" alt="logo-client" class="rounded-md">
            </div>
        </div>
    </section>
</template>

<script setup>
    import logo1 from "../../assets/logo-client/logo-1.jpg"
    import logo2 from "../../assets/logo-client/logo-2.jpg"

    const logoClient = [logo1, logo2]

    import AdvertisingSlider from './AdvertisingSlider.vue'
</script>