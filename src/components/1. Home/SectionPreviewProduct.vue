<template>
    <section name="sectionPreviewProduk" class="grid grid-cols-1 bg-white text-xs lg:text-base mx-auto">
        <div name="preview" class="grid grid-cols-1 gap-4 items-center justify-items-center">
            <containerPreviewProduct/>
        </div>
    </section>  
</template>

<script setup>
    import containerPreviewProduct from './ContainerPreviewProduct.vue'
</script>
