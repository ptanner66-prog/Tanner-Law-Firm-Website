import Link from 'next/link'

export default function Hero() {
  return (
    <section className="gradient-bg pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-primary-200 text-sm font-medium">Louisiana & Florida Licensed</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Cannabis & Hemp
              <span className="text-primary-400 block">Compliance Made Simple</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
              Stay ahead of evolving regulations with our subscription-based legal information service.
              Expert-curated compliance guides covering all 50 states.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/register" className="btn-primary text-lg px-8 py-4">
                Start Free Consultation
              </Link>
              <Link href="/#pricing" className="btn-outline border-white text-white hover:bg-white hover:text-navy-900 text-lg px-8 py-4">
                View Pricing
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center md:justify-start space-x-8 text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50</div>
                <div className="text-sm">States Covered</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">11+</div>
                <div className="text-sm">Compliance Guides</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Monthly</div>
                <div className="text-sm">Updates</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              {/* Decorative card stack */}
              <div className="absolute top-8 left-8 w-full h-full bg-primary-600/20 rounded-2xl"></div>
              <div className="absolute top-4 left-4 w-full h-full bg-primary-600/40 rounded-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-navy-900">Hemp Compliance Matrix</h3>
                  <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">Updated Jan 2026</span>
                </div>
                <div className="space-y-3">
                  {[
                    { state: 'California', delta8: 'Yes', delta9: 'Yes', status: 'green' },
                    { state: 'Florida', delta8: 'Yes', delta9: 'Silent', status: 'yellow' },
                    { state: 'Texas', delta8: 'Yes', delta9: 'No', status: 'red' },
                    { state: 'New York', delta8: 'No', delta9: 'Yes', status: 'yellow' },
                    { state: 'Louisiana', delta8: 'Yes', delta9: 'Yes', status: 'green' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-navy-800">{row.state}</span>
                      <div className="flex space-x-4 text-sm">
                        <span className={row.delta8 === 'Yes' ? 'text-green-600' : row.delta8 === 'No' ? 'text-red-600' : 'text-yellow-600'}>
                          D8: {row.delta8}
                        </span>
                        <span className={row.delta9 === 'Yes' ? 'text-green-600' : row.delta9 === 'No' ? 'text-red-600' : 'text-yellow-600'}>
                          D9: {row.delta9}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Sample preview. Full guide includes all 50 states + territories.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
