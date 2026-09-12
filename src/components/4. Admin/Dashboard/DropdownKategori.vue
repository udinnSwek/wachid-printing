<template>
  <div class="relative flex md:flex-row flex-col mb-6 gap-6 font-sans font-semibold text-sm w-full border-t-2 border-blue-800 py-3 md:items-end">
    <div class="relative flex flex-col w-[50%]">
      <label for="filterKategori" class="font-serif tracking-wide text-lg">Filter Kategori:</label>
      <!-- Wrapper utama: relative agar ul absolutnya tidak lari -->
      <div class="relative w-full" ref="dropdownRef">
        
        <!-- Tombol Trigger (Berfungsi seperti <select>) -->
        <button 
          type="button"
          @click="selectActive = !selectActive"
          class="w-full flex items-center justify-between appearance-none bg-yellow-400 pl-4 pr-10 py-2 rounded-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-colors text-left"
        >
          <div class="flex items-center truncate">
                <!-- Munculkan titik warna JIKA ada kategori yang dipilih -->
                <span 
                  v-if="selectedKategori"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                  :class="getWarna(selectedKategori, daftarKategori)"
                >
                  <span>
                    {{ labelKategoriTerpilih }}
                  </span>
                </span>
                <span 
                  v-else 
                  class="text-zinc-700 font-medium"
                >
                  {{ labelKategoriTerpilih }} <!-- Ini akan merender "Pilih Kategori" -->
                </span>
            </div>
          
          <!-- Icon Chevron -->
          <ChevronDownIcon 
            :class="['absolute right-2 w-5 h-5 text-slate-800 pointer-events-none transition-transform duration-200', 
            selectActive ? 'rotate-180' : 'rotate-0']"
          />
        </button>

        <!-- Dropdown Menu (Berfungsi seperti <option>) -->
        <Transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ul 
            v-if="selectActive"
            class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-sm shadow-lg max-h-60 overflow-y-auto focus:outline-none"
          >
            <!-- Option 1: Semua Kategori -->
            <li 
              @click="pilihKategori('')"
              :class="[
                'cursor-pointer select-none py-2 px-4 text-sm transition-colors border-b border-slate-100',
                selectedKategori === '' ? 'bg-yellow-100 font-bold text-yellow-800' : 'text-slate-700 hover:bg-zinc-100'
              ]"
            >
              Semua Kategori
            </li>
            
            <!-- Option 2: Loop Daftar Kategori -->
            <li 
              v-for="kat in daftarKategori" 
              :key="kat.id"
              @click="pilihKategori(kat.id)"
              :class="[
                'cursor-pointer select-none py-2 px-4 text-sm transition-colors justify-center',
                selectedKategori === kat.id ? 'bg-yellow-100 font-bold text-yellow-800' : 'text-slate-700 hover:bg-zinc-100'
              ]"
            >
              <span 
                class="inline-block rounded-full border border-black/10" 
                :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getWarna(kat.id, props.daftarKategori)]"
              >
                {{ kat.nama }}  
              </span>
            </li>
          </ul>
        </Transition>
      </div>
    </div>

    <div class="flex flex-col">
      <label class="font-serif tracking-wide text-lg">Cari:</label>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Cari nama produk..." 
        class="px-6 py-2 font-normal bg-zinc-200 focus:outline-none rounded-sm transition focus:ring-2 focus:ring-yellow-600"
      />
      </div>
      <div class="w-full text-right">
        <p class="leading-12   bottom-0 right-0 text-5xl font-serif text-blue-900"><span class="font-normal tracking-normal"> Kategori> </span> {{ namaKategoriTerpilih }}</p>
      </div>
  </div>
</template>

<script setup>
  import {ChevronDownIcon} from '@heroicons/vue/24/solid'
  import { ref, computed, onMounted, onUnmounted} from 'vue'

  const dropdownRef = ref(null);

// 1. Fungsi untuk mencari nama kategori berdasarkan ID yang terpilih
const labelKategoriTerpilih = computed(() => {
  if (!selectedKategori.value) return 'Semua Kategori';
  
  // Asumsi daftarKategori adalah props, jika ref gunakan daftarKategori.value
  const kategori = props.daftarKategori.find(k => k.id === selectedKategori.value);
  return kategori ? kategori.nama : 'Semua Kategori';
});

// 2. Fungsi saat user mengklik opsi di dalam <ul>
const pilihKategori = (id) => {
  selectedKategori.value = id; // Update v-model
  selectActive.value = false;  // Tutup dropdown
};

// 3. Fungsi "Click Outside" (Menutup dropdown jika user klik tempat lain di layar)
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    selectActive.value = false;
  }
};

// Pasang sensor pendeteksi klik layar saat komponen dimuat
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Cabut sensor saat komponen dihancurkan (mencegah memory leak)
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

 const props = defineProps({
    daftarKategori: {
        type: Array,
        required: true
    }
  })

  const selectActive = ref(false)

  
  const selectedKategori = defineModel('selectedKategori', {type: [String, Number], default: ''})
  const searchQuery = defineModel('searchQuery', {type: String, default: ''})
  
  const namaKategoriTerpilih = computed(() => {
  // 1. Jika belum ada yang dipilih (misal value masih ""), tampilkan default
    if (!selectedKategori.value) {
      return "All Product";
      }
  
      // 2. Cari kategori di dalam array yang ID-nya COCOK dengan yang dipilih
      const kategori = props.daftarKategori.find(
        (kat) => kat.id === selectedKategori.value

      );
  
      // 3. Jika ketemu, tampilkan namanya. Jika anehnya tidak ketemu, kembalikan default
      return kategori ? kategori.nama : "All Product";
  });

  import { useWarnaKategori } from '../../../utils/getWarnaKategori.vue'

  const { getWarna } = useWarnaKategori()

</script>

<style>
  .select{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
</style>