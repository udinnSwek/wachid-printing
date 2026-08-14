<template>
    <section class="w-full overflow-hidden">
        <div 
        class="flex w-full transition-transform duration-700 h-fit lg:h-175"
        :style="{ transform: `translateX(-${currentIndex * 100}%)`}"
        >
            <ContainerHero v-for="(img, index) in heroImage" :key="index" :src="getImgUrl(img)" alt="Hero Image"
                class="w-full flex flex-none bg-blue-900 justify-end"/>
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted, onUnmounted} from 'vue';
    import ContainerHero from './ContainerHero.vue';
        
    const heroImage = ref([
        'hero-1.png',
        'hero-2.png',
        'hero-3.png'
    ]);

    const getImgUrl = (name) => {
        // Cukup return URL-nya langsung
        return new URL(`../../assets/hero-img/${name}`, import.meta.url).href;
    }

    // ---- Logika Slider ----

    const currentIndex = ref(0);
    let sliderInterval = null;

    const nextImg = () => {
        if (currentIndex.value === heroImage.value.length - 1){
            currentIndex.value = 0;
        } else {
            currentIndex.value++;
        }
    };

    onMounted(() => {
        sliderInterval = setInterval(nextImg, 5000);
    });

    onUnmounted(() => {
        if(sliderInterval){
            clearInterval(sliderInterval);
        }
    })
</script>