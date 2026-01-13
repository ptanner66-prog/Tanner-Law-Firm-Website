'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscription, setSubscription] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await fetch('/api/user/subscription')
        const data = await res.json()
        setSubscription(data.plan || 'none')
      } catch {
        setSubscription('none')
      }
    }
    if (session) fetchSubscription()
  }, [session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) return null

  const guides = [
    { title: 'Hemp Cannabinoid Legality Guide', description: '50-state Delta-8/Delta-9/HHC compliance matrix', updated: 'Jan 2026', premium: false },
    { title: '50-State Product Type Sales Guide', description: 'Legal status by product category across all states', updated: 'Jan 2026', premium: false },
    { title: 'Hemp Beverages Retail Requirements', description: 'State-by-state beverage sales regulations', updated: 'Jan 2026', premium: false },
    { title: 'Packaging and Labeling Guide', description: 'Compliance requirements for product packaging', updated: 'Dec 2025', premium: true },
    { title: 'Hemp Product Licensing Guide', description: 'License requirements by state and product type', updated: 'Dec 2025', premium: true },
    { title: 'Testing Requirements Matrix', description: 'Lab testing mandates across jurisdictions', updated: 'Dec 2025', premium: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy-900">Welcome, {session.user?.name || 'Member'}</h1>
            <p className="text-navy-600 mt-1">Access your compliance guides and resources</p>
          </div>

          {subscription === 'none' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-yellow-800 mb-2">No Active Subscription</h3>
              <p className="text-yellow-700 mb-4">Subscribe to access compliance guides and resources.</p>
              <Link href="/#pricing" className="btn-primary inline-block">View Plans</Link>
            </div>
          )}

          {subscription && subscription !== 'none' && (
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-primary-800">Active Subscription: {subscription.charAt(0).toUpperCase() + subscription.slice(1)}</h3>
                  <p className="text-primary-700">Your compliance guides are updated monthly</p>
                </div>
                <Link href="/dashboard/billing" className="text-primary-600 hover:text-primary-700 font-medium">Manage Billing →</Link>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {guides.map((guide, i) => {
              const isLocked = guide.premium && subscription !== 'premium'
              return (
                <div key={i} className={`card relative ${isLocked ? 'opacity-75' : ''}`}>
                  {isLocked && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-navy-100 text-navy-600 text-xs px-2 py-1 rounded-full">Premium</span>
                    </div>
                  )}
                  <h3 className="font-bold text-navy-900 mb-2 pr-16">{guide.title}</h3>
                  <p className="text-navy-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Updated: {guide.updated}</span>
                    {isLocked ? (
                      <Link href="/#pricing" className="text-primary-600 text-sm font-medium">Upgrade →</Link>
                    ) : (
                      <button className="text-primary-600 text-sm font-medium hover:text-primary-700">Download PDF</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="font-bold text-navy-900 mb-4">Upcoming Webinars</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-navy-800">Q1 2026 Regulatory Update</p>
                    <p className="text-sm text-gray-500">January 25, 2026 at 2:00 PM EST</p>
                  </div>
                  <button className="text-primary-600 text-sm font-medium">Register</button>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <p className="font-medium text-navy-800">Delta-8 State Analysis</p>
                    <p className="text-sm text-gray-500">February 15, 2026 at 2:00 PM EST</p>
                  </div>
                  <button className="text-primary-600 text-sm font-medium">Register</button>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-navy-900 mb-4">Recent Updates</h3>
              <div className="space-y-4">
                <div className="py-3 border-b border-gray-100">
                  <p className="font-medium text-navy-800">Florida Updates Hemp Testing Rules</p>
                  <p className="text-sm text-gray-500">January 10, 2026</p>
                </div>
                <div className="py-3 border-b border-gray-100">
                  <p className="font-medium text-navy-800">California Clarifies D9 Beverage Limits</p>
                  <p className="text-sm text-gray-500">January 5, 2026</p>
                </div>
                <div className="py-3">
                  <p className="font-medium text-navy-800">Texas Enforcement Action Alert</p>
                  <p className="text-sm text-gray-500">December 28, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
