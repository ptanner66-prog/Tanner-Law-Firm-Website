'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'basic'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }

      router.push('/login?registered=true')
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <span className="text-2xl font-bold text-white">Tanner Law</span>
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
        <p className="text-gray-300">Start your compliance journey today</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-primary-800">
            <span className="font-semibold">Selected Plan:</span>{' '}
            {plan === 'premium' ? 'Premium ($1,000/mo)' : 'Basic ($500/mo)'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">Company Name</label>
            <input
              type="text"
              className="input-field"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">Password</label>
            <input
              type="password"
              required
              minLength={8}
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-primary-600">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-primary-600">Privacy Policy</Link>.
        </p>

        <div className="mt-6 text-center">
          <p className="text-navy-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}
