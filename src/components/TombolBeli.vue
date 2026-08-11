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

const kirimWA = () => {
    const pesan = `Halo Admin Wachid Printing, saya tertarik untuk memesan produk berikut:

*Detail Pesanan*
• Produk: ${props.namaProduk}
• Jumlah: ${props.jumlahProduk || '(mohon isi sendiri)'} pcs

*Catatan Pesanan*
${props.catatan || 'Belum ada catatan khusus'}

Mohon informasi mengenai:
• Ketersediaan produk
• Estimasi harga
• Estimasi waktu pengerjaan
• Biaya tambahan jika ada

Terima kasih.`;

    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    window.open(urlWA, '_blank');
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 'smooth' untuk meluncur halus, 'auto' untuk instan
  })
}


</script>