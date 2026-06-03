'use client'

import { useState, useMemo } from 'react'
import { EventType, GuestType, CocktailKey, Prices, CalculationResult } from '@/lib/types'
import { calculate, calculateTotal, formatWhatsApp } from '@/lib/calculator'
import { COCKTAILS, EVENT_OPTIONS, GUEST_OPTIONS, DEFAULT_PRICES } from '@/lib/constants'
import NavTabs from '@/components/NavTabs'

// ─── Sub-components ──────────────────────────────────────────────

function Counter({
  label,
  emoji,
  value,
  onChange,
}: {
  label: string
  emoji: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-base font-medium text-gray-800">
        {emoji} {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`Quitar ${label}`}
          className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 text-xl font-bold flex items-center justify-center active:bg-amber-200 transition-colors select-none"
        >
          −
        </button>
        <span className="w-8 text-center text-xl font-bold text-gray-900 tabular-nums">
          {value}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          aria-label={`Agregar ${label}`}
          className="w-10 h-10 rounded-full bg-amber-500 text-white text-xl font-bold flex items-center justify-center active:bg-amber-600 transition-colors select-none"
        >
          +
        </button>
      </div>
    </div>
  )
}

function Card({
  title,
  children,
  className = '',
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-amber-100 p-5 print-card ${className}`}>
      {title && <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>}
      {children}
    </div>
  )
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
      <span className="text-sm font-semibold text-gray-900 ml-4 text-right shrink-0">
        {value}
      </span>
    </div>
  )
}

function pl(n: number, singular: string, plural?: string) {
  return `${n} ${n === 1 ? singular : (plural ?? singular + 's')}`
}

// ─── Price editor ────────────────────────────────────────────────

type PriceRow = { key: keyof Prices; label: string; unit: string; qty: number }

function PriceEditor({
  prices,
  result,
  onUpdate,
}: {
  prices: Prices
  result: CalculationResult
  onUpdate: (key: keyof Prices, value: string) => void
}) {
  const allRows: PriceRow[] = [
    { key: 'cerveza' as keyof Prices, label: '🍺 Cerveza', unit: '/unidad', qty: result.cerveza.units },
    { key: 'tequila' as keyof Prices, label: '🥃 Tequila', unit: '/botella', qty: result.tequila },
    { key: 'mezcal' as keyof Prices, label: '🧉 Mezcal', unit: '/botella', qty: result.mezcal },
    { key: 'ron' as keyof Prices, label: '🍹 Ron', unit: '/botella', qty: result.ron },
    { key: 'whisky' as keyof Prices, label: '🥃 Whisky', unit: '/botella', qty: result.whisky },
    { key: 'refresco' as keyof Prices, label: '🧃 Refresco', unit: '/2L', qty: result.refresco },
    { key: 'squirt' as keyof Prices, label: '🧃 Squirt', unit: '/2L', qty: result.squirt },
    { key: 'clamato' as keyof Prices, label: '🫙 Clamato', unit: '/lata 1L', qty: result.clamato },
    { key: 'sangrita' as keyof Prices, label: '🧃 Sangrita', unit: '/botella', qty: result.sangrita },
    { key: 'jugoNaranja' as keyof Prices, label: '🍊 Jugo naranja', unit: '/L', qty: result.jugoNaranja },
    { key: 'hielo' as keyof Prices, label: '🧊 Hielo', unit: '/bolsa 5kg', qty: result.hielo },
    { key: 'limones' as keyof Prices, label: '🍋 Limones', unit: '/10 pzas', qty: Math.ceil(result.limones / 10) },
    { key: 'vasos' as keyof Prices, label: '🥤 Vasos', unit: '/paquete', qty: result.vasos },
    { key: 'tajin' as keyof Prices, label: '🫙 Tajín', unit: '/frasco', qty: result.tajin },
    { key: 'cacahuates' as keyof Prices, label: '🥜 Cacahuates', unit: '/bolsa', qty: result.cacahuates },
    { key: 'papas' as keyof Prices, label: '🍟 Papas', unit: '/bolsa', qty: result.papas },
  ]
  const rows = allRows.filter(r => r.qty > 0)

  return (
    <div className="space-y-2 mb-4">
      {rows.map(r => (
        <div key={r.key} className="flex items-center gap-2">
          <span className="flex-1 text-sm text-gray-700 min-w-0 truncate">{r.label}</span>
          <span className="text-xs text-gray-400 shrink-0">{r.unit}</span>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shrink-0">
            <span className="px-2 text-gray-400 text-sm bg-gray-50 border-r border-gray-200">$</span>
            <input
              type="number"
              min="0"
              value={prices[r.key]}
              onChange={e => onUpdate(r.key, e.target.value)}
              className="w-20 text-right text-sm px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────

export default function Home() {
  const [hombres, setHombres] = useState(0)
  const [mujeres, setMujeres] = useState(0)
  const [ninos, setNinos] = useState(0)
  const [eventType, setEventType] = useState<EventType>('carne-asada')
  const [hours, setHours] = useState(4)
  const [guestType, setGuestType] = useState<GuestType>('normal')
  const [cocktails, setCocktails] = useState<Set<CocktailKey>>(new Set())
  const [prices, setPrices] = useState<Prices>(DEFAULT_PRICES)
  const [showPrices, setShowPrices] = useState(false)

  const adults = hombres + mujeres
  const totalPeople = adults + ninos
  const hasResult = adults > 0

  const toggleCocktail = (key: CocktailKey) => {
    setCocktails(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const result = useMemo(
    () => calculate(hombres, mujeres, ninos, eventType, hours, guestType, cocktails),
    [hombres, mujeres, ninos, eventType, hours, guestType, cocktails]
  )

  const total = useMemo(() => calculateTotal(result, prices), [result, prices])

  const handleShare = () => {
    const text = formatWhatsApp(
      hombres, mujeres, ninos, eventType, hours, guestType, result, total
    )
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const updatePrice = (key: keyof Prices, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num) && num >= 0) setPrices(prev => ({ ...prev, [key]: num }))
  }

  const beerPkg =
    result.cerveza.cajas > 0
      ? `${result.cerveza.cajas} caja${result.cerveza.cajas > 1 ? 's' : ''} + ${result.cerveza.units % 24} sueltas`
      : `${result.cerveza.sixPacks} six-pack${result.cerveza.sixPacks > 1 ? 's' : ''}`

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
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
        {/* ¿Quiénes van? */}
        <Card title="¿Quiénes van? 👥">
          <Counter label="Hombres adultos" emoji="🧔" value={hombres} onChange={setHombres} />
          <div className="border-t border-gray-100" />
          <Counter label="Mujeres adultas" emoji="👩" value={mujeres} onChange={setMujeres} />
          <div className="border-t border-gray-100" />
          <Counter label="Niños" emoji="👦" value={ninos} onChange={setNinos} />
          {totalPeople > 0 && (
            <p className="mt-3 text-sm text-amber-700 font-semibold text-right">
              Total: {totalPeople} persona{totalPeople !== 1 ? 's' : ''}
              {' '}({adults} adulto{adults !== 1 ? 's' : ''}
              {ninos > 0 ? ` + ${ninos} niño${ninos !== 1 ? 's' : ''}` : ''})
            </p>
          )}
        </Card>

        {/* Tu evento */}
        <Card title="Tu evento 🎉" className="no-print">
          <p className="text-sm font-semibold text-gray-500 mb-2">Tipo de evento</p>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {EVENT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setEventType(opt.value)}
                className={`rounded-xl py-2.5 px-1 text-sm font-medium transition-all text-center ${
                  eventType === opt.value
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-amber-50 text-gray-700 border border-amber-200 hover:border-amber-400'
                }`}
              >
                <span className="block text-xl mb-0.5">{opt.emoji}</span>
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-sm font-semibold text-gray-500 mb-2">¿Cuántas horas dura?</p>
          <div className="flex items-center gap-4 mb-5">
            <input
              type="range"
              min={2}
              max={8}
              step={1}
              value={hours}
              onChange={e => setHours(Number(e.target.value))}
              className="flex-1 h-2 rounded-full cursor-pointer"
            />
            <span className="text-2xl font-black text-amber-600 w-20 text-right tabular-nums">
              {hours} hrs
            </span>
          </div>

          <p className="text-sm font-semibold text-gray-500 mb-2">¿Cómo son tus invitados?</p>
          <div className="grid grid-cols-3 gap-2">
            {GUEST_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setGuestType(opt.value)}
                className={`rounded-xl py-3 px-2 text-center transition-all ${
                  guestType === opt.value
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-amber-50 text-gray-700 border border-amber-200 hover:border-amber-400'
                }`}
              >
                <span className="block text-2xl mb-1">{opt.emoji}</span>
                <span className="block text-sm font-semibold">{opt.label}</span>
                <span className="block text-xs opacity-75 leading-tight mt-0.5">{opt.desc}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Cocteles opcionales */}
        <Card title="Cocteles opcionales 🍹" className="no-print">
          <p className="text-sm text-gray-500 mb-3">
            Selecciona los que quieras ofrecer. Los ingredientes se suman sin duplicar.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {COCKTAILS.map(c => {
              const selected = cocktails.has(c.key)
              return (
                <button
                  key={c.key}
                  onClick={() => toggleCocktail(c.key)}
                  className={`rounded-xl p-3 text-left transition-all border-2 ${
                    selected
                      ? 'border-amber-500 bg-amber-50 shadow-sm'
                      : 'border-transparent bg-gray-50 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-2xl leading-none">{c.emoji}</span>
                    {selected && (
                      <span className="text-amber-500 font-bold text-base leading-none">✓</span>
                    )}
                  </div>
                  <p className="font-semibold text-sm text-gray-900 mt-1">{c.name}</p>
                  <p className="text-xs font-medium text-amber-700">{c.base}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{c.ingredients}</p>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Results */}
        {!hasResult ? (
          <div className="bg-white rounded-2xl border border-amber-100 p-10 text-center">
            <p className="text-5xl mb-3">🍺</p>
            <p className="text-gray-400 font-medium">
              Agrega invitados para ver tu lista
            </p>
          </div>
        ) : (
          <>
            {/* Lista del súper */}
            <Card title="Tu lista del súper 🛒">
              <SectionLabel>Bebidas base</SectionLabel>
              <Row
                emoji="🍺"
                label="Cerveza"
                value={`${result.cerveza.units} unidades · ${beerPkg}`}
              />
              <Row
                emoji="🧃"
                label="Refresco (Coca, Sprite, Mundet)"
                value={pl(result.refresco, 'botella') + ' 2L'}
              />
              <Row emoji="💧" label="Agua fresca" value={`${result.aguaFresca}L`} />

              {cocktails.size > 0 && (
                <>
                  <SectionLabel>Para tus cocteles</SectionLabel>
                  {result.tequila > 0 && (
                    <Row emoji="🥃" label="Tequila" value={pl(result.tequila, 'botella') + ' 750ml'} />
                  )}
                  {result.mezcal > 0 && (
                    <Row emoji="🧉" label="Mezcal" value={pl(result.mezcal, 'botella') + ' 750ml'} />
                  )}
                  {result.ron > 0 && (
                    <Row emoji="🍹" label="Ron" value={pl(result.ron, 'botella') + ' 750ml'} />
                  )}
                  {result.whisky > 0 && (
                    <Row emoji="🥃" label="Whisky" value={pl(result.whisky, 'botella') + ' 750ml'} />
                  )}
                  {result.squirt > 0 && (
                    <Row emoji="🧃" label="Squirt / toronja" value={pl(result.squirt, 'botella') + ' 2L'} />
                  )}
                  {result.jugoNaranja > 0 && (
                    <Row emoji="🍊" label="Jugo de naranja" value={`${result.jugoNaranja}L`} />
                  )}
                  {result.clamato > 0 && (
                    <Row emoji="🫙" label="Clamato" value={pl(result.clamato, 'lata') + ' 1L'} />
                  )}
                  {result.sangrita > 0 && (
                    <Row emoji="🧃" label="Sangrita" value={pl(result.sangrita, 'botella')} />
                  )}
                </>
              )}

              <SectionLabel>Extras</SectionLabel>
              <Row emoji="🧊" label="Hielo" value={pl(result.hielo, 'bolsa') + ' 5kg'} />

              <SectionLabel>Ingredientes</SectionLabel>
              <Row emoji="🍋" label="Limones" value={`${result.limones} piezas`} />
              {result.sal > 0 && (
                <Row emoji="🧂" label="Sal" value={pl(result.sal, 'sobre')} />
              )}
              {result.chilePiquin > 0 && (
                <Row emoji="🌶️" label="Chile piquín" value={pl(result.chilePiquin, 'frasco')} />
              )}
              {result.tajin > 0 && (
                <Row emoji="🫙" label="Tajín" value={pl(result.tajin, 'frasco')} />
              )}
              {result.pepino > 0 && (
                <Row emoji="🥒" label="Pepino" value={pl(result.pepino, 'pieza')} />
              )}
              <Row
                emoji="🥤"
                label="Vasos desechables"
                value={pl(result.vasos, 'paquete') + ' x50'}
              />

              <SectionLabel>Botanas 🥜</SectionLabel>
              <Row
                emoji="🥜"
                label="Cacahuates"
                value={pl(result.cacahuates, 'bolsa') + ' 200g'}
              />
              <Row emoji="🍟" label="Papas fritas" value={pl(result.papas, 'bolsa')} />
            </Card>

            {/* Estimador de costo */}
            <Card title="Estimador de costo 💰">
              <div className="flex items-start justify-between mb-4 no-print">
                <p className="text-sm text-gray-500 max-w-[60%] leading-snug">
                  Precios editables — cambia lo que no coincida con tu tienda.
                </p>
                <button
                  onClick={() => setShowPrices(!showPrices)}
                  className="text-sm text-amber-600 font-semibold ml-3 shrink-0"
                >
                  {showPrices ? 'Ocultar' : 'Editar precios'}
                </button>
              </div>

              {showPrices && (
                <div className="no-print">
                  <PriceEditor prices={prices} result={result} onUpdate={updatePrice} />
                  <div className="border-t border-gray-100 mb-4" />
                </div>
              )}

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
                    ~${Math.ceil(total / totalPeople).toLocaleString('es-MX')} MXN
                  </span>
                </div>
              </div>
            </Card>

            {/* Compartir */}
            <Card title="Compartir 📤" className="no-print">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  🖨️ Imprimir lista
                </button>
              </div>
            </Card>

            {/* Crosslink calcuasada */}
            <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5 text-center no-print">
              <p className="text-orange-900 font-medium">
                ¿También va a haber carne asada?
              </p>
              <a
                href="https://calcuasada.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-orange-600 font-bold underline underline-offset-2"
              >
                → calcuasada.com
              </a>
            </div>
          </>
        )}
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm no-print space-y-2">
        <div className="flex items-center justify-center gap-4">
          <a href="/acerca" className="hover:text-amber-600 transition-colors">Acerca de</a>
          <span>·</span>
          <a href="/privacidad" className="hover:text-amber-600 transition-colors">Privacidad</a>
          <span>·</span>
          <a href="mailto:hola@calcuchela.com" className="hover:text-amber-600 transition-colors">Contacto</a>
        </div>
        <p>Hecho con 🍺 en México · Calcuchela 2026</p>
      </footer>
    </div>
  )
}
