import { createClient } from '@supabase/supabase-js'

// Отримуємо змінні з твого файлу .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Створюємо та експортуємо клієнт
export const supabase = createClient(supabaseUrl, supabaseAnonKey)