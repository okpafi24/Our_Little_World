import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface SuccessMessageProps {
  message: string
  onDismiss?: () => void
}

export function SuccessMessage({ message, onDismiss }: SuccessMessageProps) {
  return (
    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 flex items-start space-x-3">
      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-green-800 dark:text-green-200">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
        >
          ✕
        </button>
      )}
    </div>
  )
}
