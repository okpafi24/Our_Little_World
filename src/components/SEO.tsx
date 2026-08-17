import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description?: string
  ogImage?: string
  ogUrl?: string
}

export function SEO({ title, description, ogImage, ogUrl }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | Our Little World ❤️</title>
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content="website" />
    </Helmet>
  )
}
