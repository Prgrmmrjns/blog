export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          id: string
          post_path: string
          author_name: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_path: string
          author_name: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_path?: string
          author_name?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
} 