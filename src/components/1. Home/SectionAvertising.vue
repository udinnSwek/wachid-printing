<template>
    <section class="flex flex-col bg-yellow-400 pt-16 gap-6 overflow-x-hidden">
        <div class="flex flex-col px-6 gap-6 w-full lg:w-200 lg:mx-auto">
            <p class="text-3xl lg:text-6xl font-serif font-semibold text-center text-zinc-800">Kebutuhan Anda Lebih dari Sekadar Cetak?</p>
            <p class="text-base lg:text-xl text-center text-zinc-800">
                Kami siap menangani berbagai kebutuhan <b>advertising</b> dan <b>brand execution</b>, mulai dari <b>branding kendaraan, kebutuhan event, hingga produksi dan instalasi di lokasi.</b>
            </p>
        </div>
        <!-- AnimationBar -->
        <div class="relative w-full overflow-hidden pt-6 pb-24  bg-blue-800" >
    
            <!-- 2. Ganti class animasi Tailwind dengan class CSS manual 'scroller' -->
            <!-- Tambahkan 'flex-nowrap' agar dijamin sejajar -->
            <div class="flex flex-nowrap w-max scroller hover:[animation-play-state:paused]">
            
                <div class="flex flex-nowrap gap-6 px-3 shrink-0">
                    <img 
                    v-for="(gambar, index) in listGambar" 
                    :key="'asli-' + index" 
                    :src="gambar" 
                    alt="Image Scroll"
                    class="w-64 h-48 shrink-0 max-w-none object-cover rounded-sm shadow-md" 
                    />
                </div>

                <div class="flex flex-nowrap gap-6 px-3 shrink-0" aria-hidden="true">
                    <img 
                    v-for="(gambar, index) in listGambar" 
                    :key="'duplikat-' + index" 
                    :src="gambar" 
                    alt="Image Scroll"
                    class="w-64 h-48 shrink-0 max-w-none object-cover rounded-sm shadow-md"
                    />
                </div>

                 <div class="flex flex-nowrap gap-6 px-3 shrink-0" aria-hidden="true">
                    <img 
                    v-for="(gambar, index) in listGambar" 
                    :key="'duplikat-' + index" 
                    :src="gambar" 
                    alt="Image Scroll"
                    class="w-64 h-48 shrink-0 max-w-none object-cover rounded-sm shadow-md"
                    />
                </div>

                 <div class="flex flex-nowrap gap-6 px-3 shrink-0" aria-hidden="true">
                    <img 
                    v-for="(gambar, index) in listGambar" 
                    :key="'duplikat-' + index" 
                    :src="gambar" 
                    alt="Image Scroll"
                    class="w-64 h-48 shrink-0 max-w-none object-cover rounded-sm shadow-md"
                    />
                </div>
            </div>
        </div>

        <div class="flex justify-center relative">
            <div class="relative flex justify-center">

                <div class="bg-blue-800 lg:w-[73%] lg:h-[90%] absolute lg:-top-10 rounded-b-2xl"></div>
                <img src="../../assets/Booth.png" alt="BoothIllustration"
                    class="max-w-none w-[110%] -ml-5 -mt-50 lg:w-[80%] md:max-w-7xl relative z-50"
                >
            </div>
        </div>

    </section>
</template>

<style scoped>
/* Gunakan CSS murni di Vue agar animasi 100% dijamin jalan tanpa bergantung config Tailwind */
.scroller {
  animation: geser-terus 20s linear infinite;
}

@keyframes geser-terus {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Menggeser elemen sejauh -50% (tepat melewati Kelompok 1) */
    transform: translateX(-50%);
  }
}
</style>

<script setup>
    import img1 from '../../assets/advertising-img/img1.png'
    import img2 from '../../assets/advertising-img/img2.png'
    import img3 from '../../assets/advertising-img/img3.png'

    const listGambar = [img1, img2, img3]
</script>