<template>
    <section class="w-full py-10 px-10">
        <div class="flex flex-col md:flex-row max-w-400 mx-auto gap-6">
            <div class="w-full h-full md:w-[50%]">
                <p class="text-3xl font-bold mb-2">{{ dataProduk.nama }}</p>
                <div class="w-full aspect-square bg-cover bg-center bg-zinc-200" :style="{ backgroundImage: `url(${dataProduk.gambar?.[0]?.url})` }"></div>
            </div>
            <div class="flex flex-col justify-between w-full md:w-[50%] grow gap-3">
                <div class="pl-6 shadow-lg py-3 bg-white">
                    <p class="font-bold">Deskripsi Produk</p>
                    <p>{{ dataProduk.deskripsi }}</p>
                </div>  
                <div class="flex flex-col h-full pt-3 shadow-lg justify-between bg-white">
                    <CountProduct :harga="dataProduk.harga_base" @update-jumlah="jumlahProduk = $event" class="pl-6"/>
                    <TombolBeli :jumlahProduk="jumlahProduk" :namaProduk="dataProduk.nama" class="w-full rounded-b-lg"/>
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

    const jumlahProduk = ref(1)
    const dataProduk = ref([])
    const isLoading = ref(false)

    const fetchProduk = async() => {
        isLoading.value = true

        const { data, error } = await supabase
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
        
        if(error) {
            console.error("gagal", error.message)
        } else {
            dataProduk.value = data
            console.log(data)
        }

        isLoading.value = false 
    } 

    onMounted(() => {
        fetchProduk()
    })
    console.log(route.params.slug)
</script>