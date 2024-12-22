import type { Database } from './generated/supabase'

declare global {
  type SupabaseDatabase = Database
}

export {} 