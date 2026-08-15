<template>
    <div class="relative w-full overflow-hidden pt-6 pb-24 bg-blue-800" >

        <!-- 
          1. Pindahkan gap-6 ke parent scroller agar sambungan antar 50% presisi 
        -->
        <div class="scroller flex flex-nowrap w-max gap-6 hover:[animation-play-state:paused]"
             :class="{'scroller-reverse' : reverse}">
        
            <!-- KELOMPOK 1: 50% Bagian Pertama -->
            <div class="flex flex-nowrap gap-6 shrink-0">
                <!-- Kita ulang listGambar 5 kali agar total lebarnya menutupi layar besar -->
                <template v-for="n in 5" :key="'group-1-' + n">
                    <img 
                    v-for="(gambar, index) in listGambar" 
                    :key="'asli-' + n + '-' + index" 
                    :src="gambar" 
                    alt="Image Scroll"
                    class="w-64 h-48 shrink-0 max-w-none object-cover rounded-sm shadow-md" 
                    />
                </template>
            </div>

            <!-- KELOMPOK 2: 50% Bagian Kedua (Duplikat identik untuk loop infinite) -->
            <div class="flex flex-nowrap gap-6 shrink-0" aria-hidden="true">
                <template v-for="n in 5" :key="'group-2-' + n">
                    <img 
                    v-for="(gambar, index) in listGambar" 
                    :key="'duplikat-' + n + '-' + index" 
                    :src="gambar" 
                    alt="Image Scroll"
                    class="w-64 h-48 shrink-0 max-w-none object-cover rounded-sm shadow-md"
                    />
                </template>
            </div>

        </div>
    </div>
</template>

<script setup>

    import img1 from '../../assets/advertising-img/img1.png'
    import img2 from '../../assets/advertising-img/img2.png'
    import img3 from '../../assets/advertising-img/img3.png'

    const props = defineProps({
        reverse: {
            type: Boolean,
            default: false // Defaultnya false (geser ke kiri)
        }
    })

    const listGambar = [img1, img2, img3]
    
</script>

<style scoped>
/* Gunakan CSS murni di Vue agar animasi 100% dijamin jalan tanpa bergantung config Tailwind */
.scroller {
  animation: geser-terus 40s linear infinite;
}

.scroller-reverse {
  animation-direction: reverse;
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