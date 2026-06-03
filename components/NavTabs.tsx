'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavTabs() {
  const pathname = usePathname()
  const isCalculadora = pathname === '/'
  const isCocteles = pathname.startsWith('/cocteles')

  return (
    <nav className="flex gap-1 mt-4">
      <Link
        href="/"
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          isCalculadora
            ? 'bg-white text-amber-700'
            : 'text-amber-100 hover:bg-amber-400/40'
        }`}
      >
        Calculadora
      </Link>
      <Link
        href="/cocteles"
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          isCocteles
            ? 'bg-white text-amber-700'
            : 'text-amber-100 hover:bg-amber-400/40'
        }`}
      >
        🍹 Cocteles
      </Link>
    </nav>
  )
}
