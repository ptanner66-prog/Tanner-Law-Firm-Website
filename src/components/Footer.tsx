import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold">Tanner Law</span>
            </div>
            <p className="text-gray-400 text-sm">Expert cannabis and hemp regulatory compliance guidance for businesses nationwide.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/#features" className="hover:text-primary-400 transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
              <li><Link href="/#about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link href="/#contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/dashboard" className="hover:text-primary-400 transition-colors">Member Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-primary-400 transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-primary-400 transition-colors">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-700 pt-8">
          <div className="bg-navy-800 rounded-lg p-4 mb-8">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Disclaimer:</strong> The information provided through this subscription service is for reference and educational purposes only. It does not constitute legal advice and does not guarantee compliance with state or federal law. The attorneys at Tanner Law Firm do not seek to practice law in any jurisdiction in which they are not authorized. For specific legal advice regarding your situation, please schedule a consultation.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Tanner Law Firm. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Licensed in Louisiana & Florida</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
