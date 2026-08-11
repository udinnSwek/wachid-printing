<template>
    <div class="bg-yellow-50 py-12">
        <div class="grid justify-items-center gap-6">
            <img src="../../assets/Advertisingimg1.png" alt="" class="aspect-auto w-full lg:w-[50%]">
            <button class="bg-yellow-400 rounded-full py-3 px-6 hidden lg:block text-lg font-semibold w-fit hover:scale-105 hover:bg-yellow-500 transition">
                Konsultasikan Kebutuhan Anda ->
            </button>
        </div>
        <div class="relative w-full">
            <div class="absolute bg-blue-800 inset-0 translate-x-4 translate-y-6 w-[70%] h-[90%] rounded-4xl"></div>
            <div class="absolute bg-blue-800 inset-0 h-[35%] w-[50%] top"></div>
            <img src="../../assets/Booth.png" alt="Booth" class="relative z-10 w-[80%]">
        </div>
    </div>
    <section class="py-20 px-6 lg:px-16 bg-white">
        <div class="max-w-360 mx-auto"> <!-- Lebar maksimum kontainer agar tidak terlalu lebar -->
            
            <!-- Judul (Warna biru tua kustom, besar, tebal, di tengah) -->
            <h2 class="text-4xl font-bold text-center text-[#112646] mb-16">
                Our Client
            </h2>

            <!-- Kotak Kisi Responsif untuk Semua Kartu Logo -->
            <!-- default: 2 kolom (ponsel), sm: 3, md: 4, lg: 6, xl: 12 (desktop besar) -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-6">

                <!-- -- BARIS 1 (12 LOGO Placeholder dari Gambar) -- -->
                
                <!-- Setiap Kartu Logo: putih, membulat deep, bayangan deep, padding internal, memusatkan placeholder, rasio persegi -->
                <!-- Menambahkan efek hover: sedikit membesar dan bayangan lebih dalam untuk interaktivitas -->
                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=BCA" alt="BCA" class="max-w-full max-h-full object-contain">
                </div>
                
                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=BFI+Finance" alt="BFI Finance" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Bukalapak" alt="Bukalapak" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=BUMI+LANGIT" alt="Bumi Langit" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Cheil" alt="Cheil" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=DANA" alt="DANA" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Digitalisasi" alt="Digitalisasi" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=EXCELSO" alt="Excelso" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Galenium" alt="Galenium" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Gojek" alt="Gojek" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Grab" alt="Grab" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=KENAL+SAPA" alt="KenalSapa" class="max-w-full max-h-full object-contain">
                </div>


                <!-- -- BARIS 2 (11 LOGO Placeholder dari Gambar) -- -->

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Kino" alt="Kino" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Mandiri" alt="Mandiri" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Mandom" alt="Mandom" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Media+Massa" alt="Media Massa" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=MNC" alt="MNC" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=OVO" alt="OVO" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=PERTAMINA" alt="Pertamina" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Pizza+Hut" alt="Pizza Hut" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=SAMSUNG" alt="Samsung" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Tokopedia" alt="Tokopedia" class="max-w-full max-h-full object-contain">
                </div>

                <div class="bg-white rounded-3xl shadow-deep p-6 flex items-center justify-center aspect-square transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <img src="https://placehold.co/120x60/f1f5f9/1e293b.png?text=Traveloka" alt="Traveloka" class="max-w-full max-h-full object-contain">
                </div>

            </div>
        </div>
    </section>
    <!-- <p>Ini Section Advertising</p>
    <p class="font-bold text-3xl text-zinc-800">Kebutuhan Anda Lebih dari Sekadar Cetak?</p>
    <p class="font-bold text-lg text-zinc-800">Kami juga menangani berbagai kebutuhan advertising dan brand execution, mulai dari branding kendaraan, kebutuhan event, hingga produksi dan instalasi di lokasi.</p> -->
</template>