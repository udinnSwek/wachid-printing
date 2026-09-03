<script>
    export function useWarnaKategori() {
        const daftarWarnaBadge = [
            // --- HUE GELAP & BOLD (Teks Putih) ---
            'text-white bg-red-600 ',       // Merah solid
            'text-white bg-blue-600 ',      // Biru solid
            'text-white bg-green-700 ',     // Hijau tua
            'text-white bg-purple-700 ',    // Ungu tua
            'text-white bg-orange-600 ',    // Oranye pekat
            'text-white bg-teal-700 ',      // Hijau toska gelap
            'text-white bg-pink-600 ',      // Pink pekat
            'text-white bg-indigo-700 ',    // Nila/Biru keunguan gelap
            'text-white bg-slate-800 ',     // Abu-abu sangat gelap (hampir hitam)
            
            // --- HUE CERAH & TERANG (Teks Hitam) ---
            'bg-yellow-300 text-black',    // Kuning terang
            'bg-lime-400 text-black',      // Hijau lemon
            'bg-cyan-300 text-black',      // Biru muda/Cyan terang
            'bg-amber-300 text-black',     // Kuning keemasan muda
            'bg-fuchsia-300 text-black',   // Pink keunguan muda
            'bg-emerald-300 text-black'    // Hijau zamrud muda
        ];

        const getWarna = (kategoriId, daftarKategori) => {
            // Karena ini file terpisah, kita cek array-nya
            if (!daftarKategori || daftarKategori.length === 0) return daftarWarnaBadge[0];

            const indexArray = daftarKategori.findIndex(kat => kat.id === kategoriId);
            const indexValid = indexArray !== -1 ? indexArray : 0;
            
            return daftarWarnaBadge[indexValid % daftarWarnaBadge.length];
        };

        return { getWarna };
    }   
</script>