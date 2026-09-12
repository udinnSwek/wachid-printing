<template>
    <section v-if="isProduct === false" class="flex items-center justify-center text-2xl text-center text-zinc-400 h-screen">
        <p class="items-center">Produk <strong>"{{ route.params.slug }}"</strong> <br> tidak ada dalam katalog Kami</p>
    </section>   
    <section v-if="isProduct" class="w-full py-10 px-10">
        <div class="flex flex-col md:flex-row max-w-400 mx-auto gap-6 h-full">
            <div class="w-full h-full md:w-[50%]">
                <p class="font-serif text-3xl font-semibold mb-2 tracking-normal">{{ dataProduk.nama || 'Nama Produk' }}</p>
                <div class="w-full aspect-square bg-cover bg-center bg-zinc-200 rounded-sm" :style="{ backgroundImage: `url(${dataProduk.gambar?.[0]?.url})`}"></div>
            </div>
            <div class="flex flex-col justify-end w-full md:w-[50%] h-full gap-3">
                <div class="px-6 py-3 bg-white border-b border-zinc-400">
                    <p class="font-serif font-semibold tracking-tight text-2xl mb-2 text-zinc-800">Deskripsi Produk</p>
                    <p class="text-sm text-justify indent-6">{{ dataProduk.deskripsi }}</p>
                </div>  
                <div class="flex flex-col h-full pt-3 justify-between bg-white">
                    <CountProduct :harga="dataProduk.harga_base" @update-jumlah="jumlahProduk = $event" class="pl-6"/>
                    <TombolBeli :jumlahProduk="jumlahProduk" :namaProduk="dataProduk.nama" class="w-full rounded-sm"/>
                </div>
            </div> 
        </div>
    </section>
</template>
<script setup>
    import { supabase } from '../../supabaseClient';
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'

    import CountProduct from './CountProduct.vue';
    import TombolBeli from '../TombolBeli.vue';

    const route = useRoute()

    const isProduct = ref('true')

    const jumlahProduk = ref(1)
    const dataProduk = ref([])
    const isLoading = ref(false)

    const fetchProduk = async() => {
        isLoading.value = true

         try{
            // await new Promise(resolve => setTimeout(resolve, 3000))

             const { data } = await supabase
            .from('produk')
            .select(
                `id,
                nama,
                deskripsi,
                harga_base,
                slug,
                gambar (url)`
            )
            .eq('slug', route.params.slug)
            .single()
            
            dataProduk.value = data
            isProduct.value = true
         }

         catch(error){
            console.error("gagal", error.message)

         }

         finally{
            isLoading.value = false
         }        
    } 

    onMounted(() => {
        fetchProduk()
    })
    console.log(route.params.slug)
</script>