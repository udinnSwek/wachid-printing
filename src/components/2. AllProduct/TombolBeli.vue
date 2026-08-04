<template>
    <button @click="kirimWA" class="px-4 py-2 bg-green-500 text-white rounded">
        Beli via WhatsApp
    </button>
</template>

<script setup>
// Menerima data produk dari parent
const props = defineProps({
    dataProduk: Object
})

const kirimWA = () => {
    const nomorWA = '+6281290849550';
    const pesan = `Halo, saya tertarik dengan ${props.dataProduk.nama}`;
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    window.open(urlWA, '_blank');
}
</script>