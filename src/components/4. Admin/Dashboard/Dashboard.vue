<template>
  <div>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <p  
        v-if="notifikasi.tampil" 
        :class="[
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 px-6 py-3 text-white rounded-sm font-bold shadow-2xl backdrop-blur-sm',
          notifikasi.status === 'success' ? 'bg-green-600/90' : 'bg-red-600/90'
        ]"
      >
        {{ notifikasi.pesan }}
      </p>
    </Transition>                                               
    <div class="p-5 max-w-7xl mx-auto">
      <ModalKategori
        :daftarKategori="daftarKategori"
        :editingId="editingId"
        :isModalKategori="isModalKategori"
        :isAddingNew="isAddingNew"
        :loading="loading"

        v-model:editTempName="editTempName"
        v-model:newCategoryName="newCategoryName"
        v-model:editTempUrl="editTempUrl"
        v-model:newCategoryUrl="newCategoryUrl"

        @closeModal="closeModal"
        @startEdit="startEdit"
        @deleteKategori="deleteKategori"
        @saveKategori="saveKategori"
        @cancelEdit="cancelEdit"
        @tambahKategori="isAddingNew = true"
      />
      
      <Info :produkFiltered = "produkFiltered" :dataProduk="dataProduk" :jumlahKategori="jumlahKategori" @openModalAdd="openModalAdd" @openModalKategori="openModalKategori"/>

      <DropdownKategori :daftarKategori = "daftarKategori" v-model:selected-kategori="selectedKategori" v-model:search-query="searchQuery"/>

      <TabelProduk :loading="loading" :produkFiltered="produkFiltered" :daftarKategori="daftarKategori" @openModalEdit="openModalEdit" />

      <ModalForm
        v-if="isModalOpen"
        :isModalOpen="isModalOpen" 
        :isEditMode="isEditMode" 
        :generatedSlug="generatedSlug" 
        :daftarKategori="daftarKategori"
        :loading="loading"
        
        v-model:nama="form.nama"
        v-model:harga="form.harga_base"
        v-model:kategoriId="form.kategori_id"
        v-model:gambarURL="form.gambar_url",
        v-model:deskripsi="form.deskripsi"

        @closeModal="closeModal"
        @saveProduk="saveProduk"
        @hapusProduk="deleteProduk"
      />

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

    </div>
  </div>
  
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { supabase } from '../../../supabaseClient.js';
  import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
  import { cloudinaryName } from '../../../cloudinaryInfo.js';


  import Info from './Info.vue'
  import DropdownKategori from './DropdownKategori.vue';
  import TabelProduk from './TabelProduk.vue';
  import ModalForm from './ModalForm.vue';
  import ModalKategori from './ModalKategori.vue';

  const CLOUD_NAME = cloudinaryName;


  const dataProduk = ref([])
  const jumlahKategori = ref(0)
  const daftarKategori = ref([])
  const selectedKategori = ref('')
  const selectedGambarId = ref(null)
  const loading = ref(false)
  
  const searchQuery = ref('')

  const isModalOpen = ref(false)
  const isEditMode = ref(false)
  const selectedProdukId = ref(null)
  const isModalKategori = ref(false)
  const notifikasi = ref({
    tampil: false,
    status: 'success', // 'success' atau 'error'
    pesan: ''
  });
  
  const editingId = ref(null) 
  const editTempName = ref('')  
  const editTempUrl = ref('')
  const isAddingNew = ref(false)
  const newCategoryName = ref('')
  const newCategoryUrl = ref('')

  const form = ref({
    nama: '',
    harga_base: 0,
    kategori_id: '',
    gambar_url: '',
    deskripsi: ''
  })

  const confirmationToken = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      const token = session?.access_token

      if (!token) {
        alert("Anda harus login untuk melakukan aksi ini!")
        return null
      }

      return token
  }

 watch(
    [isModalOpen, isModalKategori],
    ([modalOpen, modalKategori]) => {
      if (modalOpen || modalKategori) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }
  )

  // Pastikan scroll dikembalikan normal jika komponen hancur saat modal masih terbuka
  onUnmounted(() => {
    document.body.classList.remove('overflow-hidden')
  })

  const generatedSlug = computed(() => {
    if (!form.value.nama) return '' 
    return form.value.nama
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  })

  const fetchData = async () => {

    loading.value = true

    try{
      await new Promise(resolve => setTimeout(resolve, 3000))
  
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
        .order('id', { ascending: true })

        dataProduk.value = data
    }

    catch (error) {
      console.error('error fetchData:', error.message)
    }

    finally {
      loading.value = false
    }
  }

  const fetchDaftarKategori = async () => {
    
    await new Promise(resolve => setTimeout(resolve, 3000))

    const { data, count, error } = await supabase
      .from("kategori")
      .select("id, nama, url", { count: "exact" })
      .order('id', { ascending: true })
    
    if (error) console.error(error.message)
    else {
      daftarKategori.value = data
      jumlahKategori.value = count
    }
  }

  const munculkanNotif = (status, pesan) => {
  notifikasi.value = { tampil: true, status, pesan };
  
  // Sembunyikan otomatis setelah 3 detik
  setTimeout(() => {
    notifikasi.value.tampil = false;
  }, 3000);
};

  const produkFiltered = computed(() => {
    let hasilFilter = dataProduk.value

  // 1. Filter berdasarkan Kategori (jika ada yang dipilih)
  if (selectedKategori.value) {
    hasilFilter = hasilFilter.filter(
      (produk) => produk.kategori?.id === selectedKategori.value
    )
  }

  // 2. Filter berdasarkan Teks Pencarian (jika ada yang diketik)
  if (searchQuery.value.trim() !== '') {
    const kataKunci = searchQuery.value.toLowerCase()
    hasilFilter = hasilFilter.filter(
      (produk) => produk.nama.toLowerCase().includes(kataKunci)
    )
  }

  // Kembalikan data yang sudah melewati kedua filter tersebut
  return hasilFilter
  })


  const startEdit = (kategori) => {
    editingId.value = kategori.id
    editTempName.value = kategori.nama
    editTempUrl.value = kategori.url || ''
  }

// 2. Membatalkan Edit
  const cancelEdit = () => {
    editingId.value = null
    isAddingNew.value = false
    editTempName.value = ''
    editTempUrl.value = ''
    newCategoryUrl.value = ''
    newCategoryName.value = ''
  }

  // 4. Menyimpan Kategori Baru (Disimulasikan)
  const saveKategori = async (fileMentahDariChild) => {
    // 1. Tentukan nilai mana yang mau disimpan
    // Jika sedang edit, ambil dari editTempName. Jika sedang nambah baru, ambil dari newCategoryName.
    const namaYangDisimpan = editingId.value !== null 
      ? editTempName.value 
      : newCategoryName.value

    // Simpan URL lama sebelum mengunggah gambar baru. Setelah upload,
    // editTempUrl akan tetap menjadi sumber satu-satunya untuk URL lama.
    const urlGambarKategoriLama = editingId.value !== null
      ? editTempUrl.value
      : null

    let urlKategoriFinal = editingId.value !== null 
      ? editTempUrl.value
      : newCategoryUrl.value

    // Validasi: Jangan lanjutkan jika kosong
    if (namaYangDisimpan.trim() === '') {
      cancelEdit() // Matikan mode edit/add
      isAddingNew.value = false
      return
    }

    loading.value = true

    console.log(editingId.value)
    console.log(isAddingNew.value)
    console.log(namaYangDisimpan)

    try {
      // 2. Buat Payload
      const payloadKategori = {
        nama: namaYangDisimpan,
        url: urlKategoriFinal || null
      }

      if (fileMentahDariChild) {
        urlKategoriFinal = await jalankanUploadCloudinary(fileMentahDariChild)
        payloadKategori.url = urlKategoriFinal
      }

      // 3. Tentukan Aksi Berdasarkan State
      if (editingId.value !== null) {
        // SEDANG MODE EDIT -> Lakukan UPDATE
        const { error: errUpdate } = await supabase
          .from('kategori')
          .update(payloadKategori)
          .eq('id', editingId.value)

        if (errUpdate) throw errUpdate

        // Hapus gambar lama hanya setelah URL baru berhasil disimpan ke DB.
        // Jika penghapusan gagal, data kategori tetap menunjuk ke gambar baru.
        if (fileMentahDariChild && urlGambarKategoriLama && urlGambarKategoriLama !== urlKategoriFinal) {
          try {
            const { data: { session } } = await supabase.auth.getSession()
            const responHapus = await fetch('/api/hapus-gambar', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.access_token || ''}`
              },
              body: JSON.stringify({ gambarURL: urlGambarKategoriLama })
            })

            if (!responHapus.ok) {
              const detailError = await responHapus.json().catch(() => ({}))
              console.error('Gagal menghapus gambar kategori lama:', detailError.error || responHapus.statusText)
            }
          } catch (errHapus) {
            console.error('Error menghapus gambar kategori lama:', errHapus)
          }
        }

      } else if (isAddingNew.value) {
        // SEDANG MODE TAMBAH BARU -> Lakukan INSERT
        const { error: errInsert } = await supabase
          .from('kategori')
          .insert([payloadKategori])

        if (errInsert) throw errInsert
      }
      await fetchData()
      cancelEdit()
      munculkanNotif('success', `Kategori "${namaYangDisimpan}" Berhasil Disimpan`)
      isAddingNew.value = false

    } catch (err) {
      munculkanNotif('error', 'Gagal Menyimpan Kategori' + err.message)
      console.log(err.message)
    } finally {
      loading.value = false
    }

    await fetchDaftarKategori() 
  }

  const openModalKategori = () => {
    isModalKategori.value = true
  }

  const openModalAdd = () => {
    isEditMode.value = false
    selectedProdukId.value = null
    selectedGambarId.value = null // <--- TAMBAHKAN INI
    form.value = { nama: '', harga_base: 0, kategori_id: '', gambar_url: '', deskripsi: '' }
    isModalOpen.value = true
  }

  const openModalEdit = (produk) => {
    isEditMode.value = true
    selectedProdukId.value = produk.id
    selectedGambarId.value = produk.gambar[0]?.id || null
    
    form.value = {
      nama: produk.nama,
      harga_base: produk.harga_base,
      kategori_id: produk.kategori?.id || '',
      gambar_url: produk.gambar[0]?.url || '',
      deskripsi: produk.deskripsi || ''
    }
    isModalOpen.value = true
    console.log(form.value)

  }

  const closeModal = () => {
    isModalOpen.value = false
    isModalKategori.value = false
  }

  const jalankanUploadCloudinary = async (file) => {
    // 1. Ambil token user yang sedang login
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Anda harus login untuk mengunggah gambar");

    // 2. Minta signature ke backend Vercel
    const sigResponse = await fetch('/api/otorisasi-upload', {
      headers: { 'Authorization': `Bearer ${session.access_token}` }
    });
    
    if (!sigResponse.ok) throw new Error("Gagal mendapatkan otorisasi upload");
    
    const { timestamp, signature, apiKey } = await sigResponse.json();

    // 3. Siapkan data untuk dikirim ke Cloudinary (TANPA upload_preset)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature); 
    // Hapus baris formData.append('upload_preset', ...)

    // 4. Eksekusi upload
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Gagal mengunggah gambar ke Cloudinary');
    
    const data = await response.json();
    return data.secure_url;
  };



 const saveProduk = async (fileMentahDariChild) => {
  // Aktifkan loading utama agar tombol simpan ter-disable
  loading.value = true; 

  const urlGambarLama = isEditMode.value ? form.value.gambar_url : null;
  console.log("Cek URL Gambar Lama:", urlGambarLama);

  try {
    // Kita siapkan variabel penampung. Default-nya pakai URL gambar yang sudah ada (kalau lagi edit)
    let urlGambarFinal = form.value.gambar_url; 

    // Jika child melempar file baru, kita upload dulu!
    if (fileMentahDariChild) {
      // Tunggu sampai gambar selesai diupload dan URL-nya didapat
      urlGambarFinal = await jalankanUploadCloudinary(fileMentahDariChild);
      
      // Update state form dengan URL baru tersebut
      form.value.gambar_url = urlGambarFinal; 
    }

    const payloadProduk = {
      nama: form.value.nama,
      slug: generatedSlug.value,
      harga_base: form.value.harga_base,
      kategori_id: form.value.kategori_id,
      deskripsi: form.value.deskripsi
    };

    if (isEditMode.value) {
      
      // --- MODE EDIT ---
      const { error: errProduk } = await supabase
        .from('produk')
        .update(payloadProduk)
        .eq('id', selectedProdukId.value);

      if (errProduk) throw errProduk;

      // Update / Insert ke tabel 'gambar' menggunakan urlGambarFinal
      if (urlGambarFinal) {
        if (selectedGambarId.value) {
          const { error: errGambar } = await supabase
            .from('gambar')
            .update({ url: urlGambarFinal }) 
            .eq('id', selectedGambarId.value);
          if (errGambar) throw errGambar;
        } else {
          const { error: errGambar } = await supabase
            .from('gambar')
            .insert([{ produk_id: selectedProdukId.value, url: urlGambarFinal }]);
          if (errGambar) throw errGambar;
        }
      }

      if (fileMentahDariChild && urlGambarLama) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          const responHapus = await fetch('/api/hapus-gambar', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.access_token}`
            },
            body: JSON.stringify({ gambarURL: urlGambarLama })
          });

          if (!responHapus.ok) console.error("Gagal hapus gambar lama di Cloudinary");
        } catch (errHapus) {
          // Kita tangkap errornya tapi JANGAN di-throw. 
          // Biarkan proses sukses berlanjut karena data utama sudah tersimpan.
          console.error("Error hapus gambar lama:", errHapus);
        }
      }

      munculkanNotif('success', `Produk "${payloadProduk.nama}" berhasil  di Update!`); // Panggil notifikasi Anda
      
    } else {
      
      // --- MODE TAMBAH BARU ---
      const { data: produkBaru, error: errProduk } = await supabase
        .from('produk')
        .insert([payloadProduk])
        .select()
        .single();

      if (errProduk) throw errProduk;

      // Insert ke tabel 'gambar' menggunakan urlGambarFinal
      if (urlGambarFinal && produkBaru) {
        const { error: errGambar } = await supabase
          .from('gambar')
          .insert([{ produk_id: produkBaru.id, url: urlGambarFinal }]);
        if (errGambar) throw errGambar;
      }

      munculkanNotif('success', `Produk "${payloadProduk.nama}" berhasil  di Tambahkan!`); // Panggil notifikasi Anda
    }
    await fetchData(); // Refresh data tabel
    closeModal()
  } catch (error) {
    // Tangkap SEMUA error di sini (baik dari Cloudinary maupun Supabase)
    console.error('Error Simpan:', error);
    munculkanNotif('error', 'Gagal menyimpan: ' + (error.message || 'Terjadi kesalahan sistem'));
  } finally {
    // Matikan loading apa pun hasilnya
    loading.value = false;
  }
};

  const deleteKategori = async (id, nama, url) => {

    const token = await confirmationToken();
    if (!token) return

    const isConfirmed = confirm(`Apakah kamu yakin ingin menghapus kategori "${nama}"? \n\nPeringatan: Menghapus kategori mungkin akan gagal jika masih ada produk yang menggunakan kategori ini.`)
    
    if (!isConfirmed) return

    console.log('Mencoba menghapus ID:', id, 'Tipe datanya:', typeof id);
    console.log('Nama kategori:', nama);
    console.log('kategoriUrl =', url)
    loading.value = true

    try {
      if(url) {
        const responseHapusGambar = await fetch('/api/hapus-gambar', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`    
           },
          body: JSON.stringify({ gambarURL: url })
        });

        if (!responseHapusGambar.ok) {
          const errData = await responseHapusGambar.json();
          throw new Error(errData.error || 'Gagal menghapus gambar di Cloudinary');
        }  
      } 
      const { error: errDelete } = await supabase
        .from('kategori')
        .delete()
        .eq('id', id)

      if (errDelete) throw errDelete

      munculkanNotif('success', `Kategori "${nama}" Berhasil Dihapus!`)
      await fetchDaftarKategori()
      
      
    } catch (err) {
      if (err.code === '23503') {
        munculkanNotif('error', `Gagal menghapus! Kategori "${nama}" masih digunakan oleh satu atau beberapa produk. Silakan ubah atau hapus produk terkait terlebih dahulu.`)
      } else {
        munculkanNotif('error', 'Terjadi kesalahan saat menghapus data: ' + err.message)
      }
      
    } finally {
      loading.value = false
    }
  }

  const deleteProduk = async () => {

    const token = await confirmationToken();
    if (!token) return

    const isConfirmed = confirm(`Apakah kamu yakin ingin menghapus produk "${form.value.nama}"?`)
    
    if (!isConfirmed) return

    loading.value = true

    try {
      if(form.value.gambar_url) {
        const responseHapusGambar = await fetch('/api/hapus-gambar', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`    
           },
          body: JSON.stringify({ gambarURL: form.value.gambar_url })
        });

        if (!responseHapusGambar.ok) {
          const errData = await responseHapusGambar.json();
          throw new Error(errData.error || 'Gagal menghapus gambar di Cloudinary');
      }  
    } 

      const { error: errHapusGambar } = await supabase
      .from('gambar') // GANTI dengan nama tabel URL Anda
      .delete()
      .eq('produk_id', selectedProdukId.value) // GANTI dengan nama kolom foreign key di tabel tersebut

      if (errHapusGambar) throw errHapusGambar
      
      const { error: errHapusProduk } = await supabase
        .from('produk')
        .delete()
        .eq('id', selectedProdukId.value)

      if (errHapusProduk) throw errHapusProduk

      await fetchData()

      closeModal()

      munculkanNotif('success', 'Produk Berhasil Dihapus')
      
      
    } catch (err) {
        munculkanNotif('error', 'Terjadi kesalahan saat menghapus data: ' + err.message)

    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchData()
    fetchDaftarKategori()
  })

  const router = useRouter();

  const handleLogout = async () => {
    const isConfirmed = confirm("Apakah A nda yakin ingin keluar dari halaman Admin?");
    
    if (isConfirmed) {
      try {
        
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        router.push('/');

      } catch (error) {
          alert("Gagal melakukan log out: " + error.message);
      }
    }
  }
</script>
