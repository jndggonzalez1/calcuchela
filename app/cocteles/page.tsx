import type { Metadata } from 'next'
import Link from 'next/link'
import { RECIPES } from '@/lib/recipes'
import NavTabs from '@/components/NavTabs'

export const metadata: Metadata = {
  title: 'Recetas de Cocteles Mexicanos — Calcuchela',
  description:
    'Aprende a preparar los cocteles más populares de las fiestas mexicanas: Michelada, Paloma, Charro Negro, Cuba Libre, Vampiro y más. Recetas fáciles paso a paso.',
  alternates: { canonical: 'https://calcuchela.com/cocteles' },
  openGraph: {
    title: 'Recetas de Cocteles Mexicanos — Calcuchela',
    description:
      'Los cocteles más tomados en fiestas mexicanas, con recetas paso a paso y proporciones exactas.',
    url: 'https://calcuchela.com/cocteles',
  },
}

const difficultyColor = {
  'Fácil': 'bg-green-100 text-green-700',
  'Medio': 'bg-amber-100 text-amber-700',
  'Difícil': 'bg-red-100 text-red-700',
}

export default function CoctelesPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-gradient-to-b from-amber-500 to-amber-600 px-5 pt-10 pb-12 text-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight">🍺 Calcuchela</h1>
          <p className="mt-2 text-amber-100 text-lg font-medium">
            Nunca te quedes sin chela en la fiesta 🍺
          </p>
          <NavTabs />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-5 pb-20 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Cocteles para tu fiesta</h2>
          <p className="text-sm text-gray-500">
            Los tragos más pedidos en fiestas mexicanas, con receta completa y proporciones exactas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {RECIPES.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/cocteles/${recipe.slug}`}
              className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 flex items-start gap-4 hover:border-amber-300 hover:shadow-md transition-all group"
            >
              <span className="text-4xl leading-none shrink-0">{recipe.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {recipe.name}
                  </h3>
                  <span className="text-xs font-medium text-gray-400">{recipe.base}</span>
                </div>
                <p className="text-sm text-gray-600 leading-snug mb-2">{recipe.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColor[recipe.difficulty]}`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">⏱ {recipe.time}</span>
                  <span className="text-xs text-gray-400">🥃 {recipe.glassType}</span>
                </div>
              </div>
              <span className="text-amber-400 group-hover:text-amber-600 transition-colors text-lg shrink-0">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-amber-500 rounded-2xl p-5 text-center text-white">
          <p className="font-bold text-lg mb-1">¿Cuánto necesitas comprar?</p>
          <p className="text-amber-100 text-sm mb-3">
            Usa la calculadora para saber exactamente cuántas botellas y latas necesitas para tu fiesta.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-50 transition-colors"
          >
            Ir a la calculadora →
          </Link>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm space-y-2">
        <div className="flex items-center justify-center gap-4">
          <Link href="/acerca" className="hover:text-amber-600 transition-colors">Acerca de</Link>
          <span>·</span>
          <Link href="/privacidad" className="hover:text-amber-600 transition-colors">Privacidad</Link>
          <span>·</span>
          <a href="mailto:hola@calcuchela.com" className="hover:text-amber-600 transition-colors">Contacto</a>
        </div>
        <p>Hecho con 🍺 en México · Calcuchela 2026</p>
      </footer>
    </div>
  )
}
