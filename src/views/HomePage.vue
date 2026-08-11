<template>
    <div>
        <SectionHero class="shadow-lg"/>
        <sectionSliderProduk />
        <SectionPreviewProduct/>
        <SectionAvertising/>
        <!-- <p>ini Halaman Home</p> -->
    </div>
</template>

<script setup>
    import SectionPreviewProduct from '../components/1. Home/SectionPreviewProduct.vue'
    import sectionSliderProduk from '../components/1. Home/SectionSliderProduk.vue'
    import SectionHero from '../components/1. Home/SectionHero.vue';
    import SectionAvertising from '../components/1. Home/SectionAvertising.vue';
</script>