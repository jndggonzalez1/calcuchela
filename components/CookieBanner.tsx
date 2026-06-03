'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-4 shadow-lg">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-sm text-gray-300 flex-1 leading-relaxed">
          🍪 Este sitio usa cookies para mostrarte anuncios relevantes a través de Google AdSense.
          Al seguir navegando, aceptas su uso.{' '}
          <Link href="/privacidad" className="underline text-amber-400 hover:text-amber-300">
            Política de privacidad
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-amber-500 hover:bg-amber-400 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors"
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
