<template>
        <button @click="kirimWA" class="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition">
            Beli via WhatsApp
        </button>
</template>

<script setup>
const nomorWA = import.meta.env.VITE_NOMOR_WHATSAPP

// Menerima data produk dari parent
const props = defineProps({
    namaProduk : String,
    jumlahProduk: Number
})

console.log('PROPS:', props)
console.log('JUMLAH:', props.jumlahProduk)

const kirimWA = () => {
    const pesan = `Halo, saya tertarik dengan ${props.namaProduk} dengan jumlah ${props.jumlahProduk}`;
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    window.open(urlWA, '_blank');
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 'smooth' untuk meluncur halus, 'auto' untuk instan
  })
}


</script>