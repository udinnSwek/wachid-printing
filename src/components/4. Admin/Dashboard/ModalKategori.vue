<template>
  <div v-if="isModalKategori" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-opacity text-base" 
      @click.self="$emit('closeModal')">
    <div class="bg-white flex flex-col w-[60%] rounded-sm shadow-xl max-h-[80%] overflow-clip">
      <div class="flex justify-between items-center mb-4 bg-yellow-400 px-6 pt-5 pb-3">
        <p class="text-2xl font-semibold font-serif text-slate-800">Edit / Tambah Kategori</p>
        <button @click="$emit('closeModal')" class="text-zinc-800 hover:text-slate-600 font-bold text-lg cursor-pointer">
          &times;
        </button>
      </div>
      <div class="flex items-center mb-4 bg-yellow-50 px-6 pt-3 pb-2">
        <button @click="beginAdd" 
          class="bg-blue-600 text-white w-fit px-5 py-2 rounded-md hover:bg-blue-700 text-sm font-medium mb-4 ml-6">
          + Tambah Kategori
        </button>
      </div>

      <div ref="scrollContainer" class="overflow-x-auto border-zinc-600 mx-6 mb-6">
        <table class="w-full text-left text-sm text-zinc-800 border border-zinc-600">
          <thead class="sticky top-0 z-10 bg-yellow-400 border-b border-slate-200">
            <tr class="divide-x divide-zinc-600 text-center">
              <th scope="col" class="px-4 py-3 w-4">No</th>
              <th scope="col" class="px-4 py-3">Nama Kategori</th>
              <th scope="col" class="px-4 py-3">Gambar/Icon</th>
              <th scope="col" class="px-4 py-3">Aksi</th
            ></tr>
          </thead>
          <tbody>
            <tr v-for="(kategori, index) in daftarKategori" 
              :key="kategori.id" 
              class="divide-x divide-zinc-600"
              :class="[index % 2 === 0 ? 'bg-white' :'bg-yellow-50' ]">
              <td class="px-4 py-3">
                {{ index + 1 }}
              </td>

              
              <td class="px-4 py-3">
                <span v-if="editingId !== kategori.id" 
                  :class="['inline-flex items-center px-2.5 py-0.5 rounded-full font-medium', getWarna(kategori.id, daftarKategori)]">
                  {{ kategori.nama }}
                </span>
                <input v-else 
                  v-model="editTempName" 
                  type="text" placeholder="Nama Kategori..." 
                  @keyup.enter="handleSubmit" @keyup.esc="cancel" 
                  class="w-full border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  autofocus />
              </td>
              
              <td class="px-4 py-3">
                <div v-if="editingId !== kategori.id" class="flex justify-center">
                  <img v-if="kategori.url" :src="kategori.url" alt="Icon kategori" class="w-30 h-30 object-cover rounded-md border border-slate-200" />
                  <div v-else class="w-10 h-10 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center text-[10px] text-slate-400">Kosong</div>
                </div>
                <div v-else class="flex flex-col gap-2 min-w-48">
                  <input type="file" accept="image/*"
                   @change="handleFileSelect" :disabled="loading" class="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer" />
                  <img v-if="previewLokal || editTempUrl" :src="previewLokal || editTempUrl" alt="Preview gambar kategori" class="w-16 h-16 object-cover rounded-md border border-slate-200" />
                </div>
              </td>

              <td class="px-4 py-3 text-right space-x-3">
                <template v-if="editingId !== kategori.id">
                  <button 
                    @click="beginEdit(kategori)" class="text-blue-600 hover:text-blue-800 font-medium">
                    Edit
                  </button>
                  <button 
                    @click="$emit('deleteKategori', kategori.id, kategori.nama, kategori.url)" class="text-red-600 hover:text-red-800 font-medium">
                    Hapus
                  </button>
                </template>
                <template v-else>
                  <button @click="handleSubmit" :disabled="loading" class="text-green-600 hover:text-green-800 disabled:text-green-300 font-medium">
                    {{ loading ? 'Mengunggah...' : 'Simpan' }}
                  </button>
                  <button @click="cancel" class="text-slate-500 hover:text-slate-700 font-medium">
                    Batal
                  </button>
                </template>
              </td>
            </tr>

            <tr v-if="isAddingNew" class="bg-blue-50/30">
              <td class="px-4 py-3 text-slate-400 text-center">
                *
              </td>
              <td class="px-4 py-3">
                <input v-model="newCategoryName" type="text" placeholder="Ketik nama kategori baru..." @keyup.enter="handleSubmit" @keyup.esc="cancel" class="w-full border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" autofocus />
              </td>
              <td class="px-4 py-3">
                <div class="flex flex-col gap-2 min-w-48">
                  <input type="file" accept="image/*" @change="handleFileSelect" :disabled="loading" class="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer" />
                  <img v-if="previewLokal || newCategoryUrl" :src="previewLokal || newCategoryUrl" alt="Preview gambar kategori" class="w-16 h-16 object-cover rounded-md border border-slate-200" />
                </div>
              </td>
              <td class="px-4 py-3 text-right space-x-3">
                <button @click="handleSubmit" :disabled="loading" class="text-green-600 hover:text-green-800 disabled:text-green-300 font-medium">
                  {{ loading ? 'Mengunggah...' : 'Simpan' }}
                </button>
                <button @click="cancel" class="text-slate-500 hover:text-slate-700 font-medium">
                  Batal
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onUnmounted, nextTick } from 'vue'
  import { useWarnaKategori } from '../../../utils/getWarnaKategori.vue'

  defineProps({ 
    daftarKategori: { type: Array, required: true }, 
    editingId: { type: Number, default: null }, 
    isModalKategori: { type: Boolean }, 
    isAddingNew: { type: Boolean }, 
    loading: { type: Boolean, default: false } 
  })

  const { getWarna } = useWarnaKategori()
  const emit = defineEmits(['closeModal', 'startEdit', 'deleteKategori', 'saveKategori', 'cancelEdit', 'tambahKategori'])

  const editTempName = defineModel('editTempName', { type: String, default: '' })
  const newCategoryName = defineModel('newCategoryName', { type: String, default: '' })
  const editTempUrl = defineModel('editTempUrl', { type: String, default: '' })
  const newCategoryUrl = defineModel('newCategoryUrl', { type: String, default: '' })
  const fileMentah = ref(null)
  const previewLokal = ref('')
  const scrollContainer = ref(null)

  const clearPreview = () => { 
    if (previewLokal.value.startsWith('blob:')) 
    URL.revokeObjectURL(previewLokal.value);
    previewLokal.value = '';
    fileMentah.value = null 
  }

  const beginEdit = (kategori) => { 
    clearPreview(); 
    editTempName.value = kategori.nama; 
    editTempUrl.value = kategori.url || ''; emit('startEdit', kategori) 
  }

  const beginAdd = async () => {
    clearPreview(); 
    newCategoryName.value = ''; 
    newCategoryUrl.value = ''; 
    emit('tambahKategori') 

    await nextTick();
    if (scrollContainer.value) {
      scrollContainer.value.scrollTo({
        top: scrollContainer.value.scrollHeight,
        behavior: 'smooth' // Membuat efek scroll halus
      });
    }
  }

  const handleFileSelect = (event) => { 
    const file = event.target.files?.[0]; 
    if (!file) return; clearPreview(); 
    fileMentah.value = file; 
    previewLokal.value = URL.createObjectURL(file) 
  }

  const handleSubmit = () => emit('saveKategori', fileMentah.value)

  const cancel = () => { 
    clearPreview();
    emit('cancelEdit')
  }

  watch(() => [editTempUrl.value, newCategoryUrl.value], ([editUrl, newUrl]) => { 
    if (!fileMentah.value && !(previewLokal.value.startsWith('blob:'))) previewLokal.value = editUrl || newUrl || '' 
  })

  onUnmounted(clearPreview)
</script>
