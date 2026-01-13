'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Tanner Law</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-slate-600 hover:text-green-600">Features</Link>
            <Link href="/#pricing" className="text-slate-600 hover:text-green-600">Pricing</Link>
            <Link href="/#about" className="text-slate-600 hover:text-green-600">About</Link>
            <Link href="/#contact" className="text-slate-600 hover:text-green-600">Contact</Link>
            <Link href="/login" className="text-slate-600 hover:text-green-600">Sign In</Link>
            <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg">Get Started</Link>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t py-4 px-4 flex flex-col space-y-4">
          <Link href="/#features">Features</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#about">About</Link>
          <Link href="/login">Sign In</Link>
          <Link href="/register" className="bg-green-600 text-white text-center py-3 rounded-lg">Get Started</Link>
        </div>
      )}
    </nav>
  )
}
