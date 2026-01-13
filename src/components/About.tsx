export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-heading">Trusted Legal Guidance for the Cannabis Industry</h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Tanner Law Firm brings focused experience in cannabis and hemp regulatory compliance. Licensed in both Louisiana and Florida, we understand the unique challenges businesses face navigating this rapidly evolving legal landscape.
            </p>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Our subscription service was built on the proven model pioneered by industry leaders, delivering attorney-produced compliance guides directly to your inbox. We combine rigorous legal analysis with practical, business-focused guidance.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-1">LA & FL</div>
                <div className="text-sm text-navy-600">Licensed States</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
                <div className="text-sm text-navy-600">States Covered</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-600 to-navy-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us</h3>
              <ul className="space-y-4">
                {[
                  'Attorney-produced compliance materials',
                  'Clear distinction between information and legal advice',
                  'Regular updates as regulations change',
                  'Competitive pricing vs. traditional retainers',
                  'Direct attorney access included',
                  'Robust disclaimers protecting your business',
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
