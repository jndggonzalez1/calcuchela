import type { Metadata } from 'next'
import Link from 'next/link'
import { calculate, calculateTotal } from '@/lib/calculator'
import { DEFAULT_PRICES } from '@/lib/constants'
import NavTabs from '@/components/NavTabs'

const GRUPOS = [
  { n: 10,  hombres: 5,  mujeres: 5  },
  { n: 15,  hombres: 8,  mujeres: 7  },
  { n: 20,  hombres: 10, mujeres: 10 },
  { n: 25,  hombres: 13, mujeres: 12 },
  { n: 30,  hombres: 15, mujeres: 15 },
]

export function generateStaticParams() {
  return GRUPOS.map(g => ({ personas: `${g.n}-personas` }))
}

export const dynamicParams = false

function getGrupo(slug: string) {
  const n = parseInt(slug)
  return GRUPOS.find(g => g.n === n) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ personas: string }>
}): Promise<Metadata> {
  const { personas } = await params
  const grupo = getGrupo(personas)
  if (!grupo) return {}
  const { n } = grupo
  return {
    title: `¿Cuántas cervezas para ${n} personas? — Calcuchela`,
    description: `Lista completa de bebidas para ${n} personas: cuántas cervezas, refrescos, hielo y limones necesitas para tu fiesta. Calculado con Calcuchela.`,
    alternates: { canonical: `https://calcuchela.com/para/${personas}` },
    openGraph: {
      title: `Bebidas para ${n} personas — Calcuchela`,
      description: `Lista completa: cervezas, refrescos, hielo y más para una fiesta de ${n} personas.`,
      url: `https://calcuchela.com/para/${personas}`,
    },
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2 mt-5 first:mt-0">
      {children}
    </p>
  )
}

function Row({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-gray-700 text-sm flex items-center gap-2">
        <span className="w-5 text-center">{emoji}</span>
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-900 ml-4 text-right shrink-0">{value}</span>
    </div>
  )
}

function pl(n: number, singular: string, plural?: string) {
  return `${n} ${n === 1 ? singular : (plural ?? singular + 's')}`
}

export default async function Page({
  params,
}: {
  params: Promise<{ personas: string }>
}) {
  const { personas } = await params
  const grupo = getGrupo(personas)
  if (!grupo) return null

  const { n, hombres, mujeres } = grupo
  const cocktails = new Set<never>()
  const snacks = new Set<never>()
  const result = calculate(hombres, mujeres, 0, 'carne-asada', 4, 'normal', cocktails, snacks)
  const total = calculateTotal(result, DEFAULT_PRICES)

  const beerPkg =
    result.cerveza.cajas > 0
      ? `${result.cerveza.cajas} caja${result.cerveza.cajas > 1 ? 's' : ''} + ${result.cerveza.units % 24} sueltas`
      : `${result.cerveza.sixPacks} six-pack${result.cerveza.sixPacks > 1 ? 's' : ''}`

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-gradient-to-b from-amber-500 to-amber-600 px-5 pt-10 pb-12 text-white">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-4xl font-black tracking-tight block">Calcuchela</Link>
          <p className="mt-2 text-amber-100 text-lg font-medium">
            Nunca te quedes sin chela en la fiesta 🍺
          </p>
          <NavTabs />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-5 pb-20 space-y-4">

        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
          <h1 className="text-xl font-black text-gray-900 mb-1">
            Bebidas para {n} personas
          </h1>
          <p className="text-sm text-gray-500 leading-snug">
            Lista calculada para una carne asada de 4 horas con {hombres} hombres y {mujeres} mujeres.
            Consumo normal. Sin cocteles.
          </p>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tu lista del súper 🛒</h2>

          <SectionLabel>Bebidas base</SectionLabel>
          <Row emoji="🍺" label="Cerveza" value={beerPkg} />
          <Row emoji="🧃" label="Refresco" value={pl(result.refresco, 'botella') + ' 2L'} />
          <Row emoji="💧" label="Agua fresca" value={`${result.aguaFresca}L`} />

          <SectionLabel>Extras</SectionLabel>
          <Row emoji="🧊" label="Hielo" value={pl(result.hielo, 'bolsa') + ' 5kg'} />

          <SectionLabel>Ingredientes</SectionLabel>
          <Row emoji="🍋" label="Limones" value={`${result.limones} piezas`} />
          <Row emoji="🥤" label="Vasos desechables" value={pl(result.vasos, 'paquete') + ' x50'} />
        </div>

        {/* Costo */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Costo estimado 💰</h2>
          <div className="bg-amber-500 rounded-xl p-4">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-amber-100 font-medium">Total estimado</span>
              <span className="text-2xl font-black text-white tabular-nums">
                ${total.toLocaleString('es-MX')} MXN
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-amber-200 text-sm">Por persona</span>
              <span className="text-lg font-bold text-amber-100 tabular-nums">
                ~${Math.ceil(total / n).toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Precios de referencia. Pueden variar según tu tienda.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-amber-500 rounded-2xl p-5 text-center text-white">
          <p className="font-bold text-lg mb-1">¿Tu fiesta es diferente?</p>
          <p className="text-amber-100 text-sm mb-3">
            Ajusta el número de personas, el tipo de evento, horas y más.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-50 transition-colors"
          >
            Usar la calculadora completa →
          </Link>
        </div>

        {/* Links a otras páginas */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3">También calculamos para:</h2>
          <div className="flex flex-wrap gap-2">
            {GRUPOS.filter(g => g.n !== n).map(g => (
              <Link
                key={g.n}
                href={`/para/${g.n}-personas`}
                className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors"
              >
                {g.n} personas
              </Link>
            ))}
          </div>
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
