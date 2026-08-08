<template>
        <div>
            <p class="font-bold mb-2">Qty</p >
            <div class="flex flex-row mb-6">
                
                <button @click="jumlahProduk--" :disabled="jumlahProduk <= 1" class="bg-yellow-400 px-2 cursor-pointer rounded hover:bg-yellow-600">
                    <MinusIcon class="w-4 h-4"/>
                </button>
                
                <input 
                v-model.number="jumlahProduk"
                type="number"
                min="1"
                class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                bg-zinc-100 text-center py-1 font-bold w-24"
                >
                
                <button @click="jumlahProduk++" class="bg-yellow-400 px-2 cursor-pointer rounded hover:bg-yellow-600">
                    <PlusIcon class="w-4 h-4"/>
                </button>
            </div>
            <div>
                <p class="font-bold">Estimasi Harga total</p>
                <p class="font-bold text-2xl mb-6">{{ formatRupiah(totalHarga) }}</p>
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