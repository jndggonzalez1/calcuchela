import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acerca de Calcuchela',
  description:
    'Calcuchela es una calculadora gratuita para estimar bebidas y botanas en fiestas mexicanas. Hecha en México con amor y muchas chelitas.',
  alternates: { canonical: 'https://calcuchela.com/acerca' },
}

export default function Acerca() {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-gradient-to-b from-amber-500 to-amber-600 px-5 pt-10 pb-12 text-white">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-amber-100 text-sm font-medium hover:text-white">
            ← Regresar a Calcuchela
          </Link>
          <h1 className="text-3xl font-black tracking-tight mt-3">Acerca de Calcuchela</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-5 pb-20 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p className="text-2xl">🍺</p>
          <p>
            <strong className="text-gray-900">Calcuchela</strong> nació de un problema muy
            mexicano: llegar a la fiesta y que se acaben las chelas a la mitad.
          </p>
          <p>
            Es una calculadora gratuita que te ayuda a estimar cuántas cervezas, refrescos, hielo,
            limones y botanas necesitas según el número de invitados, el tipo de evento y cuántas
            horas dura la fiesta.
          </p>
          <p>
            No necesitas cuenta ni registro. Llegas, metes los datos, y te da la lista del súper
            lista para compartir por WhatsApp.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-base font-bold text-gray-900">¿Qué puedes calcular?</h2>
          <ul className="space-y-2">
            {[
              '🍺 Cervezas (six-packs, cajas o unidades sueltas)',
              '🥃 Destilados para cocteles: tequila, mezcal, ron, whisky',
              '🧃 Refrescos, Squirt, Clamato, Sangrita, jugo de naranja',
              '🧊 Hielo, limones, vasos y demás esenciales',
              '🥜 Botanas: cacahuates, papas fritas',
              '💰 Estimador de costo con precios editables',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5 text-center">
          <p className="text-orange-900 font-medium text-sm">
            ¿También organizas carne asada? Checa la calculadora hermana:
          </p>
          <a
            href="https://calcuasada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-orange-600 font-bold underline underline-offset-2 text-sm"
          >
            → calcuasada.com
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-base font-bold text-gray-900 mb-2">Contacto</h2>
          <p>
            ¿Tienes sugerencias o encontraste algo raro? Escríbenos a{' '}
            <a href="mailto:hola@calcuchela.com" className="text-amber-600 underline">
              hola@calcuchela.com
            </a>
          </p>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        Hecho con 🍺 en México · Calcuchela 2026
      </footer>
    </div>
  )
}
