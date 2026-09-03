import cloudinary from 'cloudinary';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Metode tidak diizinkan' });

  // 1. Cek otorisasi Supabase
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Akses ditolak' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) return res.status(401).json({ error: 'Token tidak valid' });

  // 2. Buat Tanda Tangan (Signature)
  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    { timestamp: timestamp }, 
    process.env.CLOUDINARY_API_SECRET
  );

  // 3. Kirim kembali ke Vue
  return res.status(200).json({ 
    timestamp, 
    signature, 
    apiKey: process.env.CLOUDINARY_API_KEY 
  });
}