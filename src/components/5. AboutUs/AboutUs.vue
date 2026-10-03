<template>
  <div class="w-full font-sans bg-white">
    
    <!-- 1. HERO SECTION -->
    <section class="bg-blue-900 h-[70vh] flex flex-col relative justify-center text-center overflow-clip">
      <div class="absolute inset-0 h-[80vh] w-[80vh] bg-yellow-50 rounded-full m-auto z-10"></div>
      <div class="absolute inset-0 h-[90vh] w-[90vh] bg-yellow-400 rounded-full m-auto z-5"></div>
      <h1 class="text-blue-900 text-7xl lg:text-8xl font-black mb-6 z-20">
        Wachid<br>Printing
      </h1>
      <p class="text-blue-900 max-w-2xl mx-auto text-base lg:text-xl font-serif font-semibold z-20">
        Penuhi semua keperluan cetakmu!
      </p>
      <img :src="gambarHero1" alt="Hero 1" class="absolute -bottom-10 right-10 w-[20%] object-cover object-center z-0">
      <img :src="gambarHero2" alt="Hero 2" class="absolute top-10 right-10 w-[20%] object-cover object-center z-0">
      <img :src="gambarHero3" alt="Hero 3" class="absolute top-0 left-10 w-[20%] object-cover object-center z-0">
      <img :src="gambarHero4" alt="Hero 4" class="absolute bottom-10 left-10 w-[20%] object-cover object-center z-0">
    </section>

    <!-- 2. PRINTING & ADVERTISING -->
    <section class="w-full mx-auto grid grid-cols-1 md:grid-cols-2">
      <!-- Kolom Printing -->
      <div class="bg-blue-900 border-t-32 flex justify-center border-yellow-400 w-full py-16 px-19">
        <div class="w-[80%] max-w-190">
          <h2 class="text-3xl lg:text-6xl font-serif font-semibold text-white mb-8 tracking-wide">Printing</h2>
          <div class="text-white text-base lg:text-xl space-y-6 ">
            <p>Sebagai perusahaan percetakan yang berpengalaman, Wachid Printing menawarkan layanan cetak komprehensif yang dirancang untuk memenuhi kebutuhan promosi dan operasional bisnis Anda.</p>
  
            <p>Mulai dari kebutuhan cetak skala kecil seperti brosur, kemasan, dan stiker, hingga cetak format besar seperti banner, spanduk, dan baliho. Tim kami siap membantu mengaplikasikan ide kreatif Anda menjadi produk cetak fisik yang memukau dan efektif dalam menarik perhatian target audiens brand Anda.</p>
          </div>
        </div>
      </div>
      
      <!-- Kolom Advertising -->
      <div class="bg-yellow-400 border-b-32 flex justify-center border-blue-900 w-full py-24 px-19">
        <div class="w-[80%] max-w-190">
          <h2 class="text-3xl lg:text-6xl font-serif font-semibold text-zinc-900 mb-8 tracking-wide">Advertising</h2>
          <div class="text-zinc-900 text-base lg:text-xl space-y-6">
            <p>Dalam dunia periklanan, visibilitas adalah kunci utama kesuksesan promosi. Wachid Printing telah dipercaya oleh berbagai brand besar dalam memfasilitasi dan mengeksekusi kebutuhan advertising mereka. Kami tidak sekadar mencetak, tetapi juga menyediakan layanan instalasi menyeluruh yang aman dan terstandarisasi.</p>
            <p>Dengan tim eksekutor lapangan yang sudah berpengalaman, kami memastikan setiap struktur iklan terpasang dengan kuat, rapi, dan tepat waktu untuk memaksimalkan exposure brand Anda.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. KEUNGGULAN KAMI -->
    <section class="py-16 px-6 w-full flex justify-center">
      <div class="max-w-400 w-full">
        <h2 class="text-3xl lg:text-6xl font-serif font-semibold text-black text-center mb-20">Keunggulan kami</h2>
        
        <div class="flex flex-col md:flex-row gap-y-20 justify-between items-center w-full">
          <!-- Item 1 -->
          <div class="flex flex-col items-center text-center">
            <div class="w-60 h-60 bg-yellow-400 rounded-full mb-8 flex items-center justify-center">
              <img :src="gambar1" alt="Harga Bersahabat" class="w-[110%] h-[110%] object-cover">
            </div>
            <h3 class="text-xl lg:text-2xl font-serif font-medium mb-4 text-black">Harga Bersahabat</h3>
            <p class="text-gray-800 text-base max-w-xs">
              Kami memberikan kualitas hasil yang premium dengan biaya yang efisien
            </p>
          </div>
          
          <!-- Item 2 -->
          <div class="flex flex-col items-center text-center">
            <div class="w-60 h-60 bg-yellow-400 rounded-full mb-8 flex items-center justify-center">
              <img :src="gambar2" alt="Proses Cepat" class="w-[120%] h-[120%] object-cover">
            </div>
            <h3 class="text-xl lg:text-2xl font-serif font-medium mb-4 text-black">Proses Cepat</h3>
            <p class="text-gray-800 text-base max-w-xs">
              Kami memastikan setiap proyek selesai tepat waktu sesuai tenggat yang disepakati            
            </p>
          </div>
          
          <!-- Item 3 -->
          <div class="flex flex-col items-center text-center">
            <div class="w-60 h-60 bg-yellow-400 rounded-full mb-8 flex items-center justify-center">
              <img :src="gambar3" alt="Kualitas Terjamin" class="w-[115%] h-[115%] object-cover">
            </div>
            <h3 class="text-xl lg:text-2xl font-serif font-medium mb-4 text-black">Kualitas Terjamin</h3>
            <p class="text-gray-800 text-base max-w-xs">
              Kami menjamin setiap hasil kerja kami memenuhi kualitas yang diinginkan 
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. MEDSOS -->
    <section class="w-full flex flex-col mt-12">
      <!-- Top Yellow Banner -->
      <div class="bg-yellow-400 py-20 text-center relative">
        <h2 class="text-3xl lg:text-6xl font-serif font-semibold text-black tracking-wide">Media Sosial</h2>
      </div>
      
      <!-- Blue Content Area -->
      <div class="bg-blue-900 pt-16 pb-12 px-6 sm:px-12 relative">
        <!-- Floating Social Media Button -->
        <div class="absolute -top-6 left-8 sm:left-16">
          <a href="https://www.instagram.com/wachidprinting/" target="_blank" rel="noreferrer" class="bg-blue-900 text-white px-6 py-3 rounded-t-lg font-semibold border-b-0 inline-block shadow-sm">
            @wachidprinting
          </a>
        </div>

        <div v-if="jumlahHalamanInstagram" class="mx-auto w-full max-w-360">
          <div class="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-lg font-medium text-white sm:text-xl">Ikuti aktivitas kami di Instagram</p>

            <div class="gap-2 flex">
              <button
                type="button"
                aria-label="Postingan Instagram sebelumnya"
                class="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-yellow-400 hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-30"
                :disabled="halamanInstagramAktif === 0"
                @click="halamanInstagramSebelumnya"
              >
                <ChevronLeftIcon class="h-5 w-5" />
              </button> 
              <button
                type="button"
                aria-label="Postingan Instagram berikutnya"
                class="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-yellow-400 hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-30"
                :disabled="halamanInstagramAktif === jumlahHalamanInstagram - 1"
                @click="halamanInstagramBerikutnya"
              >
                <ChevronRightIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div class="overflow-hidden" @mouseenter="berhentiAutoplayInstagram" @mouseleave="mulaiAutoplayInstagram">
            <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${halamanInstagramAktif * 100}%)` }">
              <div
                v-for="(halaman, halamanIndex) in halamanInstagram"
                :key="halamanIndex"
                class="flex min-w-full justify-center gap-4"
              >
                <div
                  v-for="post in halaman"
                  :key="post.url"
                  class="instagram-embed-frame min-w-0 max-w-90 overflow-hidden rounded-lg bg-white p-1 shadow-lg"
                  :style="{ flex: `0 0 calc((100% - ${(cardsPerView - 1) * 1}rem) / ${cardsPerView})` }"
                >
                  <blockquote
                    class="instagram-media m-0 w-full max-w-none"
                    data-instgrm-version="14"
                    :data-instgrm-permalink="post.url"
                  ></blockquote>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-center gap-2">
            <button
              v-for="(_, index) in halamanInstagram"
              :key="index"
              type="button"
              :aria-label="`Buka halaman Instagram ${index + 1}`"
              :aria-current="halamanInstagramAktif === index ? 'page' : undefined"
              :class="['h-2 rounded-full transition-all', halamanInstagramAktif === index ? 'w-7 bg-yellow-400' : 'w-2 bg-white/50 hover:bg-white']"
              @click="pindahKeHalamanInstagram(index)"
            ></button>
          </div>
        </div>

        <a v-else href="https://www.instagram.com/wachidprinting/" target="_blank" rel="noreferrer" class="mx-auto block max-w-xl rounded-lg bg-white/10 p-8 text-center text-white transition hover:bg-white/20">
          Lihat postingan terbaru kami di Instagram
        </a>
      </div>
      
      <!-- Bottom Yellow Border -->
      <div class="bg-yellow-400 h-16 w-full"></div>
    </section>

  </div>
</template>

<script setup>
  import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
  import gambar1 from '../../assets/about-us/1.png'
  import gambar2 from '../../assets/about-us/2.png'
  import gambar3 from '../../assets/about-us/3.png'

  import gambarHero1 from '../../assets/about-us-hero/1.png'
  import gambarHero2 from '../../assets/about-us-hero/2.png'
  import gambarHero3 from '../../assets/about-us-hero/3.png'
  import gambarHero4 from '../../assets/about-us-hero/4.png'
  

  const instagramPosts = [
    { url: 'https://www.instagram.com/p/Dck7bNFGKLf/' },
    { url: 'https://www.instagram.com/reel/Dck8Fgtq-pA/' },
    { url: 'https://www.instagram.com/p/DcnV-q8mI98/' },
  ]

  const halamanInstagramAktif = ref(0)
  const cardsPerView = ref(1)
  let autoplayInstagramTimer

  const jumlahHalamanInstagram = computed(() => Math.ceil(instagramPosts.length / cardsPerView.value))
  const halamanInstagram = computed(() => {
    const halaman = []
    for (let index = 0; index < instagramPosts.length; index += cardsPerView.value) {
      halaman.push(instagramPosts.slice(index, index + cardsPerView.value))
    }
    return halaman
  })

  const ubahJumlahKartuInstagram = () => {
    const lebar = window.innerWidth
    cardsPerView.value = lebar >= 1280 ? 3 : lebar >= 768 ? 2 : 1
  }

  const prosesEmbedInstagram = async () => {
    await nextTick()
    window.instgrm?.Embeds?.process()
  }

  const halamanInstagramSebelumnya = () => {
    if (halamanInstagramAktif.value > 0) halamanInstagramAktif.value--
  }

  const halamanInstagramBerikutnya = () => {
    if (halamanInstagramAktif.value < jumlahHalamanInstagram.value - 1) halamanInstagramAktif.value++
  }

  const pindahKeHalamanInstagram = (index) => {
    halamanInstagramAktif.value = index
  }

  const mulaiAutoplayInstagram = () => {
    berhentiAutoplayInstagram()
    if (jumlahHalamanInstagram.value > 1) {
      autoplayInstagramTimer = window.setInterval(() => {
        halamanInstagramAktif.value = halamanInstagramAktif.value === jumlahHalamanInstagram.value - 1 ? 0 : halamanInstagramAktif.value + 1
      }, 6000)
    }
  }

  const berhentiAutoplayInstagram = () => {
    if (autoplayInstagramTimer) window.clearInterval(autoplayInstagramTimer)
  }

  watch(cardsPerView, () => {
    halamanInstagramAktif.value = Math.min(halamanInstagramAktif.value, Math.max(jumlahHalamanInstagram.value - 1, 0))
  })

  watch(halamanInstagramAktif, prosesEmbedInstagram)

  onMounted(() => {
    ubahJumlahKartuInstagram()
    window.addEventListener('resize', ubahJumlahKartuInstagram)

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.instagram.com/embed.js'
    script.onload = prosesEmbedInstagram
    document.body.appendChild(script)

    prosesEmbedInstagram()
    mulaiAutoplayInstagram()
  })

  onBeforeUnmount(() => {
    berhentiAutoplayInstagram()
    window.removeEventListener('resize', ubahJumlahKartuInstagram)
  })
</script>

<style scoped>
.instagram-embed-frame {
  height: 540px;
}

.instagram-media {
  min-width: 0 !important;
}
</style>
