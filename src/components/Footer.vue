<template>
    <footer class="w-full h-fit bg-zinc-800 text-white px-10 py-5">
        <img src="../assets/logo-wachid-printing.png" alt="Logo" class="w-32 h-auto"> 
        <p class="font-bold text-2xl">Wachid Printing</p>
        <div class="flex flex-col md:flex-row justify-between text-sm md:text-base">
            <div class="flex flex-col gap-1">
                <p class="mt-4">Jl. Akordion Utara No.kav 1, Tunggulwulung,</p>
                <p>Kec. Lowokwaru, Kota Malang, Jawa Timur 65143</p>
                <p>Jawa Timur 60101</p>
            </div>
            <div class="flex flex-col gap-3 mt-10 md:mt-0">
                <div class="flex flex-col gap-1" >
                    <p class="font-bold">Hubungi Kami</p>
                    <a 
                    :href="`https://wa.me/${nomorWA}`" target="_blank"
                    class="text-green-400 hover:text-yellow-400 hover:underline cursor-pointer">
                        {{ formatNomor(nomorWA) }} (chat only)
                    </a>
                </div>
                <div class="flex flex-col gap-1">
                    <p class="font-bold">Jam Operasional</p>
                    <div>
                        <p>Senin - Sabtu: 08:00 - 16:00</p>
                        <p>Minggu & Tanggal Merah: Libur</p>
                    </div>
                </div>
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