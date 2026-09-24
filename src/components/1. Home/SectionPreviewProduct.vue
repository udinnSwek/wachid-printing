<template>
    <section name="sectionPreviewProduk" class="grid grid-cols-1 bg-white text-xs lg:text-base mx-auto py-12">
        <p class="font-serif font-semibold text-4xl mx-auto pb-9 tracking-normal">Kategori Produk</p>
        <div name="preview" class="grid grid-cols-1 gap-9 items-center justify-items-center mb-16">
            <containerPreviewProduct/>
        </div>
    </section>  
</template>

<script setup>
    import containerPreviewProduct from './ContainerPreviewProduct.vue'
</script>
