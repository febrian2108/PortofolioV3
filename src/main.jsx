import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createClient } from '@supabase/supabase-js'
import { SupabaseProvider } from './context/SupabaseContext'
import './index.css'
import './App.css'
import App from './App.jsx'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase configuration")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SupabaseProvider supabase={supabase}>
      <App />
    </SupabaseProvider>
  </StrictMode>,
)


