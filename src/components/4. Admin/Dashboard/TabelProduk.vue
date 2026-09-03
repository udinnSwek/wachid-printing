<template>
    <div class="overflow-x-auto rounded-sm border border-zinc-600 shadow-sm">
      <table class="w-full text-left text-sm text-zinc-600 divide-y divide-slate-200">
        <thead class="bg-yellow-400 text-zinc-800 font-semibold uppercase text-xs font-serif tracking-wide">
          <tr class="divide-x divide-zinc-600 text-center">
            <th scope="col" class="px-4 py-3 w-4">No</th>
            <th scope="col" class="px-4 py-3">Nama</th>
            <th scope="col" class="px-4 py-3">Harga Base</th>
            <th scope="col" class="px-4 py-3">Gambar</th>
            <th scope="col" class="px-4 py-3">Kategori</th>
          </tr>
        </thead>
        <tbody class="divide-zinc-600 bg-white">
          <!-- Klik baris TR akan memicu fungsi openModalEdit -->
          <tr
            v-for="(produk, index) in produkFiltered"
            :key="produk.id"
            @click="$emit('openModalEdit', produk)"
            :class="['hover:bg-blue-100 cursor-pointer transition-colors duration-150 divide-x divide-zinc-600', index % 2 === 0 ? 'bg-white' : 'bg-yellow-50']"
            title="Klik untuk mengedit produk ini"
          >
            <td class="px-4 py-3 font-medium text-zinc-800 text-center">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-bold text-zinc-800">{{ produk.nama }}</td>
            <td class="px-4 py-3 text-right font-bold">{{ formatRupiah(produk.harga_base) }}</td>
            <td class="px-4 py-3 center">
              <img 
                :src="produk.gambar[0]?.url" 
                alt="Gambar produk" 
                class="w-14 h-14 object-cover rounded-sm border border-slate-200 mx-auto" 
              />
            </td>
            <td class="px-4 py-3 text-center">
              <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getWarna(produk.kategori.id, props.daftarKategori)]">
                {{ produk.kategori?.nama || 'Tanpa Kategori' }}
              </span>
            </td>
          </tr>

          <tr v-if="produkFiltered.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-slate-500">
              Tidak ada produk untuk kategori ini.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
  const props = defineProps({
                  produkFiltered:{
                      type: Array,
                      required: true,
                      default : () => []
                  },
                  daftarKategori:{
                    type: Array,
                    required: true,
                    default: () => []
                  }
              })

  import { useWarnaKategori } from '../../../utils/getWarnaKategori.vue';

  const { getWarna } = useWarnaKategori()

  defineEmits([
      'openModalEdit'
  ])

  function formatRupiah(angka) {
      return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
      }).format(angka);
  }
</script>