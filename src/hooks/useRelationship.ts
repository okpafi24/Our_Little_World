import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export function useRelationship() {
  const { user } = useAuth()
  const [relationshipId, setRelationshipId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchRelationship = async () => {
      try {
        const { data, error: err } = await supabase
          .from('relationship_profiles')
          .select('relationship_id')
          .eq('user_id', user.id)
          .single()

        if (err) {
          if (err.code === 'PGRST116') {
            setError('No relationship found')
          } else {
            throw err
          }
        } else if (data) {
          setRelationshipId(data.relationship_id)
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch relationship')
      } finally {
        setLoading(false)
      }
    }

    fetchRelationship()
  }, [user])

  return { relationshipId, loading, error }
}
