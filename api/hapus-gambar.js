// File: api/hapus-gambar.js
import cloudinary from 'cloudinary';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Konfigurasi menggunakan cloudinary.v2
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  // Otorisasi
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Akses ditolak: Token tidak ditemukan' });
  }

  const token = authHeader.split(' ')[1];

  const { data:{ user }, error: authError } = await supabase.auth.getUser(token);

  //Fungsi Hapus Gambar dari Cloudinary

  const { gambarURL } = req.body;
  console.log("1. URL Diterima:", gambarURL);
  console.log("CEK ENV KEY:", process.env.CLOUDINARY_API_KEY ? "ADA KUNCI" : "KOSONG!");

  if (!gambarURL) {
    return res.status(400).json({ error: 'URL gambar tidak dikirim' });
  }

  try {
    const splitUrl = gambarURL.split('/upload/');
    if (splitUrl.length !== 2) return res.status(400).json({ error: 'URL tidak valid' });

    let pathFile = splitUrl[1].replace(/^v\d+\//, ''); 
    const public_id = pathFile.substring(0, pathFile.lastIndexOf('.')); 
    
    console.log("2. Public ID:", public_id);

    const result = await cloudinary.v2.uploader.destroy(public_id);
    console.log("3. Hasil Cloudinary:", result);
    
    return res.status(200).json({ success: true, message: 'Gambar dihapus', result });
  } catch (error) {
    console.error('ERROR CLOUDINARY:', error);
    return res.status(500).json({ error: 'Gagal menghapus gambar' });
  }
}