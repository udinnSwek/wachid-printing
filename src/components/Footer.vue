<template>
    <footer class="w-full h-fit bg-zinc-800 text-white px-10 py-5">
        <img src="../assets/logo-wachid-printing.png" alt="Logo" class="w-32 h-auto"> 
        <p class="font-bold text-2xl">Wachid Printing</p>
        <div class="flex flex-col md:flex-row justify-between text-xs md:text-base">
            <div>
                <p class="mt-4">Jl. Lorem ipsum no. 67, RT 6/RW 7</p>
                <p>Lowowaru Kec.Tunggulwulung, Kota Malang</p>
                <p>Jawa Timur 60101</p>
            </div>
            <div class="mt-10 md:mt-0">
                <p class="font-bold">Hubungi Kami</p>
                <a 
                :href="`https://wa.me/${nomorWA}`" target="_blank"
                class="text-green-400 hover:text-yellow-400 hover:underline cursor-pointer">
                    {{ formatNomor(nomorWA) }} (chat only)
                </a>
                <p class="font-bold">Jam Operasional</p>
                <p>Senin - Sabtu: 08:00 - 16:00</p>
                <p>Minggu & Tanggal Merah: Libur</p>
            </div>
        </div>
   </footer>
</template>

<script setup>
    const nomorWA = import.meta.env.VITE_NOMOR_WHATSAPP

    const formatNomor = (num) => {
        if (!num) return ''
        const clean = num.replace(/\D/g, '')
        return clean.replace(/^62(\d{3})(\d{4})(\d{4,5})$/, '+62 $1-$2-$3')
    }
</script>