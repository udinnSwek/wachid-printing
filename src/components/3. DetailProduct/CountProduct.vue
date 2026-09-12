<template>
        <div>
            <div class="">
                <p class="font-serif text-zinc-800 font-semibold text-lg tracking-tight mb-2">
                    Jumlah Barang
                </p >
                <div class="flex flex-row mb-6 border border-yellow-600 w-fit rounded-sm overflow-clip">
                    
                    <button @click="jumlahProduk--" :disabled="jumlahProduk <= 1" class="px-2 cursor-pointer bg-zinc-200 hover:bg-zinc-300">
                        <MinusIcon class="w-4 h-4"/>
                    </button>
                    
                    <input 
                    v-model.number="jumlahProduk"
                    type="number"
                    min="1"
                    class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    text-center py-1 font-serif font-semibold tracking-normal w-24 font-sm focus:border-zinc-400"
                    >
                    
                    <button @click="jumlahProduk++" class="px-2 cursor-pointer bg-zinc-200 hover:bg-zinc-300">
                        <PlusIcon class="w-4 h-4"/>
                    </button>
                </div>
            </div>
            <div>
                <p class="font-serif text-zinc-800 font-semibold text-lg tracking-tight mb-2">
                    Estimasi Harga total
                </p>
                <p class="text-zinc-800 font-serif font-extrabold text-3xl mb-6 tracking-wide">
                    {{ formatRupiah(!totalHarga ? '0': totalHarga) }}
                </p>
            </div>
        </div>
</template>
<script setup>

    import { computed, ref, watch } from 'vue'
    import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'
    
    const props = defineProps({
        harga: Number
    })
    const jumlahProduk = ref(1)

    const emit = defineEmits(['updateJumlah'])
    

    const totalHarga = computed(() =>{
        return props.harga * jumlahProduk.value
    }) 

    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    }

    watch(jumlahProduk, (nilaiBaru) => {
        emit('updateJumlah', nilaiBaru)
    })
</script>