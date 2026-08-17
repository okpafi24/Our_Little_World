import React from 'react'
import { Loader } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader className="w-5 h-5 animate-spin text-rose-500" />
    </div>
  )
}
