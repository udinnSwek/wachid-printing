<template>
    <div name="cardCategory" 
        :class="['border border-blue-900 overflow-hidden shadow-sm flex flex-col justify-between rounded-sm',
        index % 2 === 0 ? 'bg-blue-900 border-blue-900' : 'bg-yellow-400 border-yellow-400']">
        <div class=" hidden md:block
            h-[75%] bg-cover bg-center rounded-br-4" 
            >
            <img :src="dataKategori.url" :alt="dataKategori.nama" class="object-cover h-full w-full">
        </div>
        <div class="flex-col pb-6 pt-6 lg:pb-12 px-6">
            <p :class="['text-2xl md:text-3xl lg:text-4xl font-serif font-semibold tracking-normal leading-none', index % 2 === 0 ? 'text-white' : 'text-zinc-800']">
                {{ dataKategori.nama }}
            </p>
            <button @click="menujuKategori(dataKategori.nama) ; click()" :class="['group cursor-pointer hover:underline pt-4 flex flex-row items-center gap-1 leading-none', index % 2 === 0 ? 'text-yellow-400': 'text-blue-800']">
                <p>lihat selengkapnya</p> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 group-hover:text-zinc-900/50">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
        
    </div>
</template>

<script setup>
   
    const props = defineProps({
        dataKategori: Object,
        index: Number
    })

    const click = () => {
        console.log(props.dataKategori.nama)
    }

    import { useRouter } from 'vue-router'

    const router = useRouter()

    const menujuKategori = (namaKategori) => {
        // Pindah ke halaman produk dan bawa pesannya di URL
        router.push({ 
            path: '/all-product', // Ganti dengan path rute halaman All Products Anda
            query: { kategori: namaKategori } 
        })
    }
</script>
