'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Pricing() {
  const { data: session } = useSession()

  const plans = [
    {
      name: 'Basic',
      price: 500,
      description: 'Essential compliance guidance for growing businesses',
      priceId: 'basic',
      features: [
        'Top 15-20 hemp-active states coverage',
        '3 core compliance charts',
        'Monthly digest updates',
        '12-month archive access',
        '30-minute monthly consultation',
        'Email support',
        'Webinar recordings',
      ],
      notIncluded: [
        'All 50 states coverage',
        'Real-time regulatory alerts',
        'Custom compliance reports',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      price: 1000,
      description: 'Complete coverage for serious operators',
      priceId: 'premium',
      features: [
        'All 50 states + territories',
        'All available compliance charts',
        'Weekly + real-time alerts',
        'Unlimited archive access',
        'Unlimited email Q&A',
        'Priority phone support',
        'Live webinar participation',
        'Custom compliance reports',
        'Group/team accounts available',
      ],
      notIncluded: [],
      popular: true,
    },
  ]

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      window.location.href = '/register?plan=' + priceId
      return
    }
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const { url } = await response.json()
      if (url) window.location.href = url
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Simple, Transparent Pricing</h2>
          <p className="section-subheading">Choose the plan that fits your business needs.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.popular ? 'bg-gradient-to-br from-navy-900 to-navy-800 text-white ring-4 ring-primary-500' : 'bg-white border-2 border-gray-200'}`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="bg-primary-500 text-white text-sm font-semibold px-4 py-1 rounded-full">Most Popular</span></div>}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-navy-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-300' : 'text-navy-600'}`}>{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-navy-900'}`}>${plan.price}</span>
                  <span className={`ml-2 ${plan.popular ? 'text-gray-300' : 'text-navy-500'}`}>/month</span>
                </div>
                <p className={`text-xs mt-2 ${plan.popular ? 'text-gray-400' : 'text-navy-500'}`}>3-month minimum commitment</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? 'text-primary-400' : 'text-primary-600'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={plan.popular ? 'text-gray-200' : 'text-navy-700'}>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start opacity-50">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span className={plan.popular ? 'text-gray-400' : 'text-navy-400'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => handleSubscribe(plan.priceId)} className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${plan.popular ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-navy-900 hover:bg-navy-800 text-white'}`}>Get Started</button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-navy-600 mb-4">Need a custom solution for your enterprise?</p>
          <Link href="/#contact" className="text-primary-600 hover:text-primary-700 font-semibold">Contact us for enterprise pricing →</Link>
        </div>
      </div>
    </section>
  )
}
