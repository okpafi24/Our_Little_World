export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
}

export interface RelationshipProfile {
  id: string
  user_id: string
  relationship_id: string
  display_name: string
  role: 'owner' | 'partner'
  created_at: string
}

export interface Photo {
  id: string
  relationship_id: string
  url: string
  caption?: string
  album_id?: string
  date?: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

export interface Album {
  id: string
  relationship_id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface WishlistItem {
  id: string
  relationship_id: string
  name: string
  description?: string
  image_url?: string
  price?: number
  currency: string
  product_url?: string
  category: 'fashion' | 'beauty' | 'technology' | 'travel' | 'home' | 'experiences' | 'gifts' | 'other'
  priority: 'must_have' | 'really_want' | 'maybe'
  purchased: boolean
  purchased_date?: string
  created_at: string
  updated_at: string
}

export interface Milestone {
  id: string
  relationship_id: string
  title: string
  description?: string
  date: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface ImportantDate {
  id: string
  relationship_id: string
  name: string
  date: string
  created_at: string
  updated_at: string
}
