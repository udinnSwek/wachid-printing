import { createClient } from '@supabase/supabase-js'

// Pull the safe environment variables from Vite's meta object
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize and export the single client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
