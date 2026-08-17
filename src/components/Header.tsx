import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Menu, X, Moon, Sun, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useState } from 'react'

export function Header() {
  const { user, signOut } = useAuth()
  const { theme, setTheme, isDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-rose-600">
            <Heart className="w-6 h-6" />
            <span>Our Little World</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">
              Home
            </Link>
            <Link to="/memories" className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">
              Memories
            </Link>
            <Link to="/wishlist" className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">
              Wishlist
            </Link>
            <Link to="/story" className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">
              Our Story
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/settings" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              Home
            </Link>
            <Link to="/memories" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              Memories
            </Link>
            <Link to="/wishlist" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              Wishlist
            </Link>
            <Link to="/story" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              Our Story
            </Link>
            {user && (
              <>
                <Link to="/settings" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
