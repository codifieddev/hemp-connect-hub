export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'editor' | 'viewer' | 'vendor' | 'user'
          profile: string
          is_active: boolean
          status: 'active' | 'inactive' | 'suspended' | 'pending'
          password_otp: number | null
          last_login: string | null
          created_at: string
          modified_at: string
          version: number
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'editor' | 'viewer' | 'vendor' | 'user'
          profile: string
          is_active?: boolean
          status?: 'active' | 'inactive' | 'suspended' | 'pending'
          password_otp?: number | null
          last_login?: string | null
          created_at?: string
          modified_at?: string
          version?: number
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'editor' | 'viewer' | 'vendor' | 'user'
          profile?: string
          is_active?: boolean
          status?: 'active' | 'inactive' | 'suspended' | 'pending'
          password_otp?: number | null
          last_login?: string | null
          created_at?: string
          modified_at?: string
          version?: number
        }
      }
      user_profiles: {
        Row: {
          _id: string
          email: string
          name: string
          dob: string | null
          projects: Json
          image: string | null
          image_thumb: string | null
          created_at: string
          modified_at: string
          id: number
        }
        Insert: {
          _id: string
          email: string
          name: string
          dob?: string | null
          projects?: Json
          image?: string | null
          image_thumb?: string | null
          created_at?: string
          modified_at?: string
        }
        Update: {
          _id?: string
          email?: string
          name?: string
          dob?: string | null
          projects?: Json
          image?: string | null
          image_thumb?: string | null
          created_at?: string
          modified_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          visibility: 'public' | 'private'
          is_public: boolean
          public_slug: string | null
          thumbnail: string | null
          progress: number
          status: 'active' | 'completed' | 'paused'
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          visibility?: 'public' | 'private'
          is_public?: boolean
          public_slug?: string | null
          thumbnail?: string | null
          progress?: number
          status?: 'active' | 'completed' | 'paused'
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          visibility?: 'public' | 'private'
          is_public?: boolean
          public_slug?: string | null
          thumbnail?: string | null
          progress?: number
          status?: 'active' | 'completed' | 'paused'
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_access: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: 'admin' | 'editor' | 'viewer'
          added_by: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          role?: 'admin' | 'editor' | 'viewer'
          added_by: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          role?: 'admin' | 'editor' | 'viewer'
          added_by?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'editor' | 'viewer' | 'vendor' | 'user'
      user_status: 'active' | 'inactive' | 'suspended' | 'pending'
      project_status: 'active' | 'completed' | 'paused'
      project_visibility: 'public' | 'private'
      access_role: 'admin' | 'editor' | 'viewer'
    }
  }
}