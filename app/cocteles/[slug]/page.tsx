import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RECIPES, RECIPE_MAP } from '@/lib/recipes'
import NavTabs from '@/components/NavTabs'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = RECIPE_MAP[slug]
  if (!recipe) return {}
  return {
    title: `${recipe.searchTitle} — Calcuchela`,
    description: `${recipe.description} Aprende a preparar ${recipe.name} en ${recipe.time} con ingredientes fáciles de conseguir en México.`,
    alternates: { canonical: `https://calcuchela.com/cocteles/${slug}` },
    openGraph: {
      title: `${recipe.name} — Cómo prepararlo paso a paso`,
      description: recipe.description,
      url: `https://calcuchela.com/cocteles/${slug}`,
    },
  }
}

const difficultyColor = {
  'Fácil': 'bg-green-100 text-green-700',
  'Medio': 'bg-amber-100 text-amber-700',
  'Difícil': 'bg-red-100 text-red-700',
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = RECIPE_MAP[slug]
  if (!recipe) notFound()

  const otherRecipes = RECIPES.filter((r) => r.slug !== slug).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    recipeCategory: 'Bebida',
    recipeCuisine: 'Mexicana',
    totalTime: `PT${recipe.time.replace(' min', 'M')}`,
    recipeIngredient: recipe.portions.map((p) => `${p.amount} de ${p.ingredient.replace(/^[^\s]+ /, '')}`),
    recipeInstructions: recipe.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
  }

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-2xl mx-auto px-4 -mt-5 pb-20 space-y-4">
        {/* Back */}
        <Link href="/cocteles" className="inline-flex items-center gap-1 text-sm text-amber-700 font-medium hover:text-amber-900">
          ← Todos los cocteles
        </Link>

        {/* Hero card */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl leading-none">{recipe.emoji}</span>
            <div>
              <h2 className="text-2xl font-black text-gray-900">{recipe.name}</h2>
              <p className="text-sm text-amber-700 font-semibold">{recipe.base}</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{recipe.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">⏱ {recipe.time}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">🥃 {recipe.glassType}</span>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Ingredientes por copa</h3>
          <ul className="space-y-2">
            {recipe.portions.map((p, i) => (
              <li key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{p.ingredient}</span>
                <span className="text-sm font-semibold text-gray-900 ml-4 text-right shrink-0">{p.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preparación */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Preparación paso a paso</h3>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Tip */}
        {recipe.tip && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
            <p className="text-sm font-bold text-amber-800 mb-1">💡 Pro tip</p>
            <p className="text-sm text-amber-700 leading-relaxed">{recipe.tip}</p>
          </div>
        )}

        {/* CTA calculadora */}
        <div className="bg-amber-500 rounded-2xl p-5 text-center text-white">
          <p className="font-bold text-base mb-1">¿Cuánto necesitas comprar?</p>
          <p className="text-amber-100 text-sm mb-3">
            Calcula exactamente cuántas botellas y latas necesitas según el número de invitados.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-50 transition-colors"
          >
            Ir a la calculadora →
          </Link>
        </div>

        {/* Otros cocteles */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-3">Otros cocteles</h3>
          <div className="grid grid-cols-2 gap-2">
            {otherRecipes.map((r) => (
              <Link
                key={r.slug}
                href={`/cocteles/${r.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <span className="text-2xl">{r.emoji}</span>
                <span className="text-sm font-semibold text-gray-800">{r.name}</span>
              </Link>
            ))}
          </div>
          <Link href="/cocteles" className="block text-center text-sm text-amber-600 font-semibold mt-3 hover:text-amber-800">
            Ver todos los cocteles →
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
