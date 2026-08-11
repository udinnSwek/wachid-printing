<template>
  <div class="p-5 max-w-7xl mx-auto">
    <!-- Section Statistics & Tombol Tambah -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div class="space-y-1 text-slate-700">
        <p class="text-sm">
          Total Produk: <strong class="text-slate-900 font-semibold">{{ produkFiltered.length }} / {{ dataProduk.length }}</strong>
        </p>
        <p class="text-sm">
          Jumlah Kategori: <strong class="text-slate-900 font-semibold">{{ jumlahKategori }}</strong>
        </p>
      </div>

      <button 
        @click="openModalAdd" 
        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span>+</span> Tambah Produk
      </button>
    </div>  

    <!-- Filter Dropdown Kategori -->
    <div class="mb-6 flex items-center gap-3">
      <label for="filterKategori" class="text-sm font-medium text-slate-700">Filter Kategori:</label>
      <select 
        id="filterKategori" 
        v-model="selectedKategori"
        class="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      >
        <option value="">Semua Kategori</option>
        <option v-for="kat in daftarKategori" :key="kat.id" :value="kat.id">
          {{ kat.nama }}
        </option>
      </select>
    </div>

    <!-- Tabel Produk -->
    <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <table class="w-full text-left text-sm text-slate-600 divide-y divide-slate-200">
        <thead class="bg-slate-50 text-slate-700 font-semibold uppercase text-xs tracking-wider">
          <tr>
            <th scope="col" class="px-4 py-3">No</th>
            <th scope="col" class="px-4 py-3">Nama</th>
            <th scope="col" class="px-4 py-3">Harga Base</th>
            <th scope="col" class="px-4 py-3">Gambar</th>
            <th scope="col" class="px-4 py-3">Kategori</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 bg-white">
          <!-- Klik baris TR akan memicu fungsi openModalEdit -->
          <tr
            v-for="(produk, index) in produkFiltered"
            :key="produk.id"
            @click="openModalEdit(produk)"
            class="hover:bg-blue-50/60 cursor-pointer transition-colors duration-150"
            title="Klik untuk mengedit produk ini"
          >
            <td class="px-4 py-3 font-medium text-slate-900">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-slate-900">{{ produk.nama }}</td>
            <td class="px-4 py-3">{{ formatRupiah(produk.harga_base) }}</td>
            <td class="px-4 py-3">
              <img 
                :src="produk.gambar[0]?.url" 
                alt="Gambar produk" 
                class="w-14 h-14 object-cover rounded-md border border-slate-200" 
              />
            </td>
            <td class="px-4 py-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
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

    <!-- MODAL FORM (Tambah / Edit) -->
    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-5 transform transition-all">
        <div class="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 class="text-lg font-bold text-slate-800">
            {{ isEditMode ? 'Edit Produk' : 'Tambah Produk Baru' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 font-bold text-lg">
            &times;
          </button>
        </div>
        
        <form @submit.prevent="saveProduk" class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600">Nama Produk</label>
            <input 
              v-model="form.nama" 
              type="text" 
              placeholder="Contoh: Sepatu Lari Nike" 
              class="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required 
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600">Slug URL (Auto Generate)</label>
            <input 
              :value="generatedSlug" 
              type="text" 
              disabled 
              class="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600">Harga Base (Rp)</label>
            <input 
              v-model.number="form.harga_base" 
              type="number" 
              placeholder="150000" 
              class="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required 
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600">Kategori</label>
            <select 
              v-model="form.kategori_id" 
              class="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Pilih Kategori</option>
              <option v-for="kat in daftarKategori" :key="kat.id" :value="kat.id">
                {{ kat.nama }}
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600">URL Gambar</label>
            <input 
              v-model="form.gambar_url" 
              type="url" 
              placeholder="https://example.com/gambar.jpg" 
              class="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required 
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600">Deskripsi</label>
            <textarea 
              v-model="form.deskripsi" 
              rows="3"
              class="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button 
              type="button" 
              @click="closeModal" 
              class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              {{ loading ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Tombol Logout -->
        <button 
          @click="handleLogout"
          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          title="Log Out"
        >
          <!-- Menggunakan SVG Icon Logout (Heroicons) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { supabase } from '../../../supabaseClient.js';
import { onMounted, ref, computed } from 'vue'

const dataProduk = ref([])
const jumlahKategori = ref(0)
const daftarKategori = ref([])
const selectedKategori = ref('')
const selectedGambarId = ref(null) // <--- TAMBAHKAN INI
const loading = ref(false)

// State Modal & Form
const isModalOpen = ref(false)
const isEditMode = ref(false)
const selectedProdukId = ref(null)

const form = ref({
  nama: '',
  harga_base: 0,
  kategori_id: '',
  gambar_url: '',
  deskripsi: ''
})

// Auto Generator Slug berdasarkan Nama Produk
const generatedSlug = computed(() => {
  if (!form.value.nama) return ''
  return form.value.nama
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
})

// Fetch Data Produk
const fetchData = async () => {
  const { data, error } = await supabase
    .from("produk")
    .select(`
      id,
      nama,
      slug,
      deskripsi,
      harga_base,
      gambar( id, url ),
      kategori ( id, nama )
    `)
    .order('id', { ascending: true }) // <-- TAMBAHKAN BARIS INI (Urutkan berdasarkan ID)

  if (error) console.error(error.message)
  else dataProduk.value = data
}

// Fetch Kategori
const fetchDaftarKategori = async () => {
  const { data, count, error } = await supabase
    .from("kategori")
    .select("id, nama", { count: "exact" })
  
  if (error) console.error(error.message)
  else {
    daftarKategori.value = data
    jumlahKategori.value = count
  }
}

// Filtered Produk
const produkFiltered = computed(() => {
  if (!selectedKategori.value) return dataProduk.value
  return dataProduk.value.filter(
    (produk) => produk.kategori?.id === selectedKategori.value
  )
})

// Buka Modal Tambah
const openModalAdd = () => {
  isEditMode.value = false
  selectedProdukId.value = null
  selectedGambarId.value = null // <--- TAMBAHKAN INI
  form.value = { nama: '', harga_base: 0, kategori_id: '', gambar_url: '', deskripsi: '' }
  isModalOpen.value = true
}

// Buka Modal Edit (saat TR diklik)
const openModalEdit = (produk) => {
  isEditMode.value = true
  selectedProdukId.value = produk.id
  selectedGambarId.value = produk.gambar[0]?.id || null // <--- SIMPAN ID GAMBAR DI SINI
  
  form.value = {
    nama: produk.nama,
    harga_base: produk.harga_base,
    kategori_id: produk.kategori?.id || '',
    gambar_url: produk.gambar[0]?.url || '',
    deskripsi: produk.deskripsi || ''
  }
  isModalOpen.value = true
}

// Tutup Modal
const closeModal = () => {
  isModalOpen.value = false
}

// Submit Data (Insert / Update)
const saveProduk = async () => {
  loading.value = true
  try {
    const payloadProduk = {
      nama: form.value.nama,
      slug: generatedSlug.value,
      harga_base: form.value.harga_base,
      kategori_id: form.value.kategori_id,
      deskripsi: form.value.deskripsi
    }

    if (isEditMode.value) {
      // 1. Update Produk
      const { error: errProduk } = await supabase
        .from('produk')
        .update(payloadProduk)
        .eq('id', selectedProdukId.value)

      if (errProduk) throw errProduk

      // 2. Update/Insert Gambar
      if (form.value.gambar_url) {
        if (selectedGambarId.value) {
          // JIKA GAMBAR SUDAH ADA, LAKUKAN UPDATE BERDASARKAN GAMBAR.ID
          const { error: errGambar } = await supabase
            .from('gambar')
            .update({ url: form.value.gambar_url }) 
            .eq('id', selectedGambarId.value) // <--- TARGETKAN GAMBAR.ID
            
          if (errGambar) throw errGambar
        } else {
          // JIKA SEBELUMNYA PRODUK BELUM PUNYA GAMBAR, LAKUKAN INSERT
          const { error: errGambar } = await supabase
            .from('gambar')
            .insert([{ produk_id: selectedProdukId.value, url: form.value.gambar_url }])
            
          if (errGambar) throw errGambar
        }
      }
    } else {
      // 1. Insert Produk Baru
      const { data: produkBaru, error: errProduk } = await supabase
        .from('produk')
        .insert([payloadProduk])
        .select()
        .single()

      if (errProduk) throw errProduk

      // 2. Insert Gambar Produk
      if (form.value.gambar_url && produkBaru) {
        const { error: errGambar } = await supabase
          .from('gambar')
          .insert([{ produk_id: produkBaru.id, url: form.value.gambar_url }]) 
          
        if (errGambar) throw errGambar
      }
    }

    // Refresh Data & Close Modal
    await fetchData()
    closeModal()
  } catch (err) {
    alert('Gagal menyimpan data: ' + err.message)
  } finally {
    loading.value = false
  }
}

function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

onMounted(() => {
  fetchData()
  fetchDaftarKategori()
})

const router = useRouter();

const handleLogout = async () => {
  // 1. Munculkan konfirmasi (opsional, untuk mencegah salah klik)
  const isConfirmed = confirm("Apakah A nda yakin ingin keluar dari halaman Admin?");
  
  if (isConfirmed) {
    try {
      
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      

      // (Opsional) Jika kamu menyimpan data user di localStorage secara manual, bersihkan di sini:
      // localStorage.removeItem('user_session');

      router.push('/');

    } catch (error) {
      alert("Gagal melakukan log out: " + error.message);
    }
  }
};
</script>