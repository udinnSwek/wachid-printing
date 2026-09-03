<template>
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      @click.self="handleClose"
    >
      <div class="bg-white rounded-sm shadow-xl w-full max-w-lg transform transition-all overflow-hidden max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center bg-yellow-400 px-6 pt-5 pb-3 shrink-0">
          <h3 class="text-2xl font-semibold font-serif text-slate-800">
            {{ isEditMode ? 'Edit Produk' : 'Tambah Produk Baru' }}
          </h3>
          <button @click="$emit('closeModal')" class="text-zinc-800 hover:text-slate-600 font-bold text-lg cursor-pointer">
            &times;
          </button>
        </div>
        
        <form @submit.prevent="handleSubmitForm" class="space-y-4 p-6 overflow-y-auto">
          <div class="flex flex-col gap-1">
            <label class="text-base font-serif font-semibold tracking-normal">Nama Produk</label>
            <input 
              v-model="nama" 
              type="text" 
              placeholder="Contoh: Sepatu Lari Nike" 
              class="px-6 py-3 text-sm bg-zinc-200 focus:outline-none rounded-sm transition focus:ring-2 focus:ring-yellow-600"
              required 
            />
          </div>
          
          <div class="flex flex-col gap-1">
            <label class="text-base font-serif font-semibold tracking-normal">Slug URL (Auto Generate)</label>
            <input 
              :value="generatedSlug" 
              type="text" 
              disabled 
              class="px-6 py-3 text-sm bg-zinc-400 focus:outline-none rounded-sm transition focus:ring-2 focus:ring-yellow-600 cursor-not-allowed"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-base font-serif font-semibold tracking-normal">Harga Base (Rp)</label>
            <input 
              v-model.number="harga" 
              type="number" 
              placeholder="150000" 
              class="px-6 py-3 text-sm bg-zinc-200 focus:outline-none rounded-sm transition focus:ring-2 focus:ring-yellow-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required 
            />
          </div>

          <div class="flex flex-col gap-1 relative" ref="dropdownRef">
            <label class="text-base font-serif font-semibold tracking-normal">Kategori</label>
            
            <!-- Tombol Trigger Dropdown -->
            <button 
              type="button"
              @click="selectActive = !selectActive"
              class="relative w-full flex items-center justify-between appearance-none bg-yellow-400 pl-4 pr-10 py-2 rounded-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-colors text-left"
            >
              <!-- Tampilan teks & warna yang sedang dipilih -->
              <div class="flex items-center truncate">
                <!-- Munculkan titik warna JIKA ada kategori yang dipilih -->
                <span 
                  v-if="kategoriId"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                  :class="getWarna(kategoriId, daftarKategori)"
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
                class="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-slate-200 rounded-sm shadow-lg max-h-60 overflow-y-auto focus:outline-none"
              >
                <!-- Option: Pilih Kategori (Disabled/Reset) -->
                <li 
                  @click="pilihKategori('')"
                  :class="[
                    'cursor-pointer select-none py-2 px-4 text-sm transition-colors border-b border-slate-100',
                    kategoriId === '' ? 'bg-yellow-100 font-bold text-yellow-800' : 'text-slate-500 hover:bg-zinc-100'
                  ]"
                >
                  Pilih Kategori
                </li>
                
                <!-- Option: Loop Daftar Kategori -->
                <li 
                  v-for="kat in daftarKategori" 
                  :key="kat.id"
                  @click="pilihKategori(kat.id)"
                  :class="[
                    'flex items-center cursor-pointer select-none py-2 px-4 text-sm transition-colors',
                    kategoriId === kat.id ? 'bg-yellow-100 font-bold text-yellow-800' : 'text-slate-700 hover:bg-zinc-100'
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
          
          <div class="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload Gambar ke Cloudinary
            </label>
            
            <input
              type="file"
              @change="handleFileSelect"
              accept="image/*"
              class="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-md file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-blue-100 file:text-blue-700 
                    hover:file:bg-blue-200 cursor-pointer"
              :disabled="isUploading"
            />
            <p v-if="isUploading" class="mt-2 text-sm text-blue-600 animate-pulse font-medium">
              Sedang mengunggah ke Cloudinary...
            </p>

            <!-- Preview Gambar diubah agar mendeteksi gambarURL -->
            <div v-if="previewLokal || gambarURL" class="mt-4">
              <img :src="previewLokal || gambarURL" alt="Preview Gambar" class="w-full max-h-48 object-contain rounded-md shadow-sm border border-slate-200 bg-zinc-200" />
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-base font-serif font-semibold tracking-normal">Deskripsi</label>
            <textarea 
              v-model="deskripsi" 
              rows="3"
              class="px-6 py-3 text-sm bg-zinc-200 focus:outline-none rounded-sm transition focus:ring-2 focus:ring-yellow-600 resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-slate-200 shrink-0 mt-4">
            <button 
              type="button" 
              @click="$emit('closeModal')" 
              class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              v-if="isEditMode"
              type="button"
              @click="handleHapusProduk"
              class="px-4 py-2 bg-red-600 hover:bg-red-800 text-zinc-100 text-sm font-medium rounded-lg transition-colors"
            >
              Hapus
            </button>
            <button 
              type="submit" 
              :disabled="loading || isUploading"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              {{ loading ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { ChevronDownIcon } from '@heroicons/vue/24/solid';  
  import { useWarnaKategori } from '../../../utils/getWarnaKategori.vue';

  const props = defineProps({
    isModalOpen: { type: Boolean },
    isEditMode: { type: Boolean },
    generatedSlug: { type: String },
    daftarKategori: { type: Array },
    loading: { type: Boolean },
  });

  const emit = defineEmits([
    'closeModal',
    'saveProduk',
    'hapusProduk'
  ]);

  const selectActive = ref(false);
  const isUploading = ref(false);
  const { getWarna } = useWarnaKategori();

  const nama = defineModel('nama', { type: String, default: '' });
  const harga = defineModel('harga', { type: [Number, String], default: 0 });
  const kategoriId = defineModel('kategoriId', { type: [String, Number], default: '' });
  const gambarURL = defineModel('gambarURL', { type: String, default: '' });
  const deskripsi = defineModel('deskripsi', { type: String, default: '' });

  // TAMBAHAN: State untuk menyimpan file mentah dan URL preview lokal
  const fileMentah = ref(null);
  const previewLokal = ref('');

  // 1. Fungsi saat user memilih gambar (HANYA BUAT PREVIEW, JANGAN UPLOAD)
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Simpan file aslinya ke ref untuk di-upload nanti
    fileMentah.value = file;
    
    // Buat URL sementara (lokal) dari browser untuk menampilkan preview
    if (previewLokal.value) URL.revokeObjectURL(previewLokal.value); // Bersihkan memori URL lama
    previewLokal.value = URL.createObjectURL(file);
    
  };

  // 3. Fungsi yang dijalankan saat tombol SIMPAN ditekan
  const handleSubmitForm = async () => {
    emit('saveProduk', fileMentah.value);
  };

  const hapusStateGambar = () => {
    if (previewLokal.value) URL.revokeObjectURL(previewLokal.value);
    fileMentah.value = null;
    previewLokal.value = '';
  }

  const handleClose = () => {
    hapusStateGambar()
    emit('closeModal');
  };

  const handleHapusProduk = () => {
    // Di fungsi deleteProduk Anda

    emit('hapusProduk')
  }

  // Referensi ke div bungkus dropdown
  const dropdownRef = ref(null);

  // Menghasilkan teks untuk tombol berdasarkan kategoriId
  const labelKategoriTerpilih = computed(() => {
    if (!kategoriId.value) return 'Pilih Kategori';
    
    // Karena daftarKategori dikirim via props
    const kategori = props.daftarKategori.find(k => k.id === kategoriId.value);
    return kategori ? kategori.nama : 'Pilih Kategori';
  });

  // Fungsi saat user klik <li>
  const pilihKategori = (id) => {
    kategoriId.value = id;
    selectActive.value = false;
  };

  // Fungsi klik di luar area untuk menutup dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      selectActive.value = false;
    }
  };

  onMounted(() => document.addEventListener('click', handleClickOutside));
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  });
</script>
