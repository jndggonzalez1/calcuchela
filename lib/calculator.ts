import { CocktailKey, SnackKey, CalculationResult, EventType, GuestType, Prices } from './types'

const DRINK_RATES: Record<GuestType, number> = {
  tranquilos: 0.55,
  normal: 0.95,
  lemueven: 1.5,
}

const TEQUILA_COCKTAILS: CocktailKey[] = ['paloma', 'charro-negro', 'vampiro']
const SHOTS_PER_BOTTLE = 16 // 750ml ÷ 45ml

function empty(): CalculationResult {
  return {
    cerveza: { units: 0, sixPacks: 0, cajas: 0 },
    tequila: 0, mezcal: 0, ron: 0, whisky: 0,
    refresco: 0, squirt: 0, jugoNaranja: 0, clamato: 0,
    sangrita: 0, aguaFresca: 0, hielo: 0, limones: 0,
    sal: 0, chilePiquin: 0, tajin: 0, pepino: 0, vasos: 0,
    cacahuates: 0, papas: 0, chicharron: 0, totopos: 0, frituras: 0,
  }
}

export function calculate(
  hombres: number,
  mujeres: number,
  ninos: number,
  eventType: EventType,
  hours: number,
  guestType: GuestType,
  cocktails: Set<CocktailKey>,
  snacks: Set<SnackKey> = new Set()
): CalculationResult {
  const adults = hombres + mujeres
  const totalPeople = adults + ninos
  if (adults === 0) return empty()

  const rate = DRINK_RATES[guestType]
  const totalDrinks = adults * rate * hours

  const hasMichelada = cocktails.has('michelada')
  const hasClamatoPrep = cocktails.has('clamato-preparado')
  const spiritCocktails = Array.from(cocktails).filter(
    c => c !== 'michelada' && c !== 'clamato-preparado'
  )
  const numSpirit = spiritCocktails.length

  // Beer: gets 100% with no spirits, 45% otherwise (beer is always popular)
  const beerFraction = numSpirit === 0 ? 1.0 : 0.45
  const beerUnits = Math.ceil(totalDrinks * beerFraction)

  // Michelada = beer + extras, doesn't reduce beer count
  const micheladaServings = hasMichelada ? Math.ceil(beerUnits * 0.35) : 0

  // Spirit cocktails share the remaining 55%
  const spiritServings =
    numSpirit > 0 ? Math.ceil((totalDrinks * 0.55) / numSpirit) : 0

  // Clamato preparado: non-alcoholic, ~35% of all guests try it
  const clamatoServings = hasClamatoPrep ? Math.ceil(totalPeople * 0.35) : 0

  // Tequila bottles
  const tequilaServings =
    TEQUILA_COCKTAILS.filter(c => cocktails.has(c)).length * spiritServings
  const tequila = Math.ceil(tequilaServings / SHOTS_PER_BOTTLE)

  // Mezcal, Ron, Whisky bottles
  const mezcal = cocktails.has('mezcalina')
    ? Math.ceil(spiritServings / SHOTS_PER_BOTTLE)
    : 0
  const ron = cocktails.has('cuba-libre')
    ? Math.ceil(spiritServings / SHOTS_PER_BOTTLE)
    : 0
  const whisky = cocktails.has('whisky-coke')
    ? Math.ceil(spiritServings / SHOTS_PER_BOTTLE)
    : 0

  // Cerveza packaging
  const cerveza = {
    units: beerUnits,
    sixPacks: Math.ceil(beerUnits / 6),
    cajas: Math.floor(beerUnits / 24),
  }

  // Refresco/Coca (drinking base + cocktails using cola)
  const cocaForCocktails =
    (cocktails.has('charro-negro') ? spiritServings * 0.2 : 0) +
    (cocktails.has('cuba-libre') ? spiritServings * 0.2 : 0) +
    (cocktails.has('whisky-coke') ? spiritServings * 0.2 : 0)
  const cocaBase = adults * 0.08 * hours + ninos * 0.15 * hours
  const refresco = Math.max(1, Math.ceil((cocaBase + cocaForCocktails) / 2))

  // Squirt (Paloma + Vampiro)
  const squirtLiters =
    (cocktails.has('paloma') ? spiritServings * 0.22 : 0) +
    (cocktails.has('vampiro') ? spiritServings * 0.15 : 0)
  const squirt = squirtLiters > 0 ? Math.ceil(squirtLiters / 2) : 0

  // Jugo naranja (Mezcalina: 100ml/serving)
  const jugoNaranja = cocktails.has('mezcalina')
    ? Math.max(1, Math.ceil(spiritServings * 0.1))
    : 0

  // Clamato (Michelada: 0.1L, Preparado: 0.15L per serving)
  const clamatoLiters = micheladaServings * 0.1 + clamatoServings * 0.15
  const clamato = clamatoLiters > 0 ? Math.max(1, Math.ceil(clamatoLiters)) : 0

  // Sangrita (Vampiro: 50ml/serving, 750ml bottles)
  const sangrita = cocktails.has('vampiro')
    ? Math.max(1, Math.ceil((spiritServings * 0.05) / 0.75))
    : 0

  // Agua fresca
  const aguaFresca = Math.ceil(totalPeople * 0.35 * hours)

  // Hielo
  const hieloBase = Math.max(1, Math.ceil(adults * 0.04 * hours))
  const hieloExtra = cocktails.has('whisky-coke') ? Math.ceil(spiritServings / 20) : 0
  const hielo = hieloBase + hieloExtra

  // Limones (suma inteligente por coctel + base para cerveza)
  let limones = Math.ceil(adults * 2)
  if (hasMichelada) limones += Math.ceil(micheladaServings * 0.5)
  if (cocktails.has('paloma')) limones += Math.ceil(spiritServings * 0.5)
  if (cocktails.has('charro-negro')) limones += Math.ceil(spiritServings * 0.3)
  if (cocktails.has('mezcalina')) limones += Math.ceil(spiritServings * 0.5)
  if (cocktails.has('cuba-libre')) limones += Math.ceil(spiritServings * 0.3)
  if (hasClamatoPrep) limones += clamatoServings
  if (cocktails.has('vampiro')) limones += Math.ceil(spiritServings * 0.5)

  // Sal
  const needsSal = (['michelada', 'paloma', 'mezcalina', 'clamato-preparado', 'vampiro'] as CocktailKey[])
    .some(c => cocktails.has(c))
  const sal = needsSal
    ? Math.max(2, Math.ceil(adults / 15))
    : Math.ceil(adults / 25)

  // Chile piquín
  const chilePiquin =
    cocktails.has('michelada') || hasClamatoPrep ? 1 : 0

  // Tajín (Michelada, Vampiro, Clamato preparado)
  const tajinCount = (['michelada', 'vampiro', 'clamato-preparado'] as CocktailKey[])
    .filter(c => cocktails.has(c)).length
  const tajin = tajinCount > 0 ? Math.max(1, Math.ceil(tajinCount / 2) + (tajinCount > 1 ? 1 : 0)) : 0

  // Pepino (Clamato preparado)
  const pepino = hasClamatoPrep ? Math.max(1, Math.ceil(clamatoServings / 8)) : 0

  // Vasos desechables
  const vasos = Math.ceil((totalPeople * 2.5) / 50)

  // Botanas opcionales (escalan con personas y horas)
  const snackRounds = Math.ceil(hours / 2)
  const snackQty = (perPeople: number) => Math.ceil(totalPeople / perPeople) * snackRounds
  const cacahuates = snacks.has('cacahuates') ? snackQty(5) : 0
  const papas      = snacks.has('papas')      ? snackQty(4) : 0
  const chicharron = snacks.has('chicharron') ? snackQty(6) : 0
  const totopos    = snacks.has('totopos')    ? snackQty(5) : 0
  const frituras   = snacks.has('frituras')   ? snackQty(4) : 0

  return {
    cerveza, tequila, mezcal, ron, whisky,
    refresco, squirt, jugoNaranja, clamato, sangrita,
    aguaFresca, hielo, limones, sal, chilePiquin, tajin,
    pepino, vasos, cacahuates, papas, chicharron, totopos, frituras,
  }
}

export function calculateTotal(result: CalculationResult, prices: Prices): number {
  return Math.round(
    result.cerveza.units * prices.cerveza +
    result.tequila * prices.tequila +
    result.mezcal * prices.mezcal +
    result.ron * prices.ron +
    result.whisky * prices.whisky +
    result.refresco * prices.refresco +
    result.squirt * prices.squirt +
    result.jugoNaranja * prices.jugoNaranja +
    result.clamato * prices.clamato +
    result.sangrita * prices.sangrita +
    result.hielo * prices.hielo +
    Math.ceil(result.limones / 10) * prices.limones +
    result.vasos * prices.vasos +
    result.tajin * prices.tajin +
    result.cacahuates * prices.cacahuates +
    result.papas * prices.papas +
    result.chicharron * prices.chicharron +
    result.totopos * prices.totopos +
    result.frituras * prices.frituras
  )
}

export function formatWhatsApp(
  hombres: number,
  mujeres: number,
  ninos: number,
  eventType: EventType,
  hours: number,
  guestType: GuestType,
  result: CalculationResult,
  total: number
): string {
  const adults = hombres + mujeres
  const totalPeople = adults + ninos

  const eventLabels: Record<EventType, string> = {
    'carne-asada': 'Carne asada',
    cumpleanos: 'Cumpleaños',
    'xv-boda': 'XV / Boda',
    posada: 'Posada',
    casual: 'Reunión casual',
  }
  const guestLabels: Record<GuestType, string> = {
    tranquilos: 'Tranquilos 😇',
    normal: 'Normal 🍺',
    lemueven: 'Le mueven 🔥',
  }

  const pl = (n: number, s: string) => `${n} ${s}${n !== 1 ? 's' : ''}`
  const lines: string[] = []

  lines.push('🍺 *Lista Calcuchela*')
  lines.push('')
  lines.push(
    `📋 ${eventLabels[eventType]} · ${hours}h · ${adults} adulto${adults !== 1 ? 's' : ''}${ninos > 0 ? ` + ${ninos} niño${ninos !== 1 ? 's' : ''}` : ''} · ${guestLabels[guestType]}`
  )
  lines.push('')
  lines.push('*🍹 BEBIDAS*')

  const { cerveza } = result
  if (cerveza.units > 0) {
    const pkg =
      cerveza.cajas > 0
        ? `${cerveza.cajas} caja${cerveza.cajas > 1 ? 's' : ''} + ${cerveza.units % 24} sueltas`
        : `${cerveza.sixPacks} six-pack${cerveza.sixPacks > 1 ? 's' : ''}`
    lines.push(`🍺 Cerveza: ${cerveza.units} unidades (${pkg})`)
  }
  if (result.tequila > 0) lines.push(`🥃 Tequila: ${pl(result.tequila, 'botella')} 750ml`)
  if (result.mezcal > 0) lines.push(`🧉 Mezcal: ${pl(result.mezcal, 'botella')} 750ml`)
  if (result.ron > 0) lines.push(`🍹 Ron: ${pl(result.ron, 'botella')} 750ml`)
  if (result.whisky > 0) lines.push(`🥃 Whisky: ${pl(result.whisky, 'botella')} 750ml`)
  lines.push(`🧃 Refresco: ${pl(result.refresco, 'botella')} 2L`)
  if (result.squirt > 0) lines.push(`🧃 Squirt/toronja: ${pl(result.squirt, 'botella')} 2L`)
  if (result.jugoNaranja > 0) lines.push(`🍊 Jugo de naranja: ${result.jugoNaranja}L`)
  if (result.clamato > 0) lines.push(`🫙 Clamato: ${pl(result.clamato, 'lata')} 1L`)
  if (result.sangrita > 0) lines.push(`🧃 Sangrita: ${pl(result.sangrita, 'botella')}`)
  lines.push(`💧 Agua fresca: ${result.aguaFresca}L`)
  lines.push(`🧊 Hielo: ${pl(result.hielo, 'bolsa')} 5kg`)

  lines.push('')
  lines.push('*🛒 INGREDIENTES*')
  lines.push(`🍋 Limones: ${result.limones} piezas`)
  if (result.sal > 0) lines.push(`🧂 Sal: ${pl(result.sal, 'sobre')}`)
  if (result.chilePiquin > 0) lines.push(`🌶️ Chile piquín: ${pl(result.chilePiquin, 'frasco')}`)
  if (result.tajin > 0) lines.push(`🫙 Tajín: ${pl(result.tajin, 'frasco')}`)
  if (result.pepino > 0) lines.push(`🥒 Pepino: ${pl(result.pepino, 'pieza')}`)
  lines.push(`🥤 Vasos: ${pl(result.vasos, 'paquete')} x50`)

  const hasSnacks = result.cacahuates > 0 || result.papas > 0 || result.chicharron > 0 || result.totopos > 0 || result.frituras > 0
  if (hasSnacks) {
    lines.push('')
    lines.push('*🥜 BOTANAS*')
    if (result.cacahuates > 0) lines.push(`🥜 Cacahuates: ${pl(result.cacahuates, 'bolsa')} 200g`)
    if (result.papas > 0)      lines.push(`🍟 Papas fritas: ${pl(result.papas, 'bolsa')}`)
    if (result.chicharron > 0) lines.push(`🐷 Chicharrón: ${pl(result.chicharron, 'bolsa')}`)
    if (result.totopos > 0)    lines.push(`🌮 Totopos + salsa: ${pl(result.totopos, 'bolsa')}`)
    if (result.frituras > 0)   lines.push(`🫙 Frituras variadas: ${pl(result.frituras, 'bolsa')}`)
  }

  if (total > 0) {
    lines.push('')
    lines.push('*💰 COSTO ESTIMADO*')
    lines.push(`Total: ~$${total.toLocaleString('es-MX')} MXN`)
    lines.push(`Por persona: ~$${Math.ceil(total / totalPeople).toLocaleString('es-MX')} MXN`)
  }

  lines.push('')
  lines.push('Calculado en calcuchela.com 🍺')
  lines.push('¿Va a haber carne asada? → calcuasada.com')

  return lines.join('\n')
}
