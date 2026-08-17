import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/types'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.display_name || profile.email,
              avatar_url: profile.avatar_url,
              created_at: profile.created_at,
            })
          }
        }
      } catch (err) {
        console.error('Auth init error:', err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.display_name || profile.email,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
      throw err
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null)
      const { error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) throw signUpError

      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authUser.id,
              email: authUser.email,
              display_name: name,
            },
          ])
        if (profileError) throw profileError
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
      throw err
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
    } catch (err: any) {
      setError(err.message || 'Failed to sign out')
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
