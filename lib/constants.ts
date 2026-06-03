import { CocktailInfo, EventType, GuestType, Prices, SnackKey } from './types'

export const DEFAULT_PRICES: Prices = {
  cerveza: 22,
  tequila: 350,
  mezcal: 400,
  ron: 280,
  whisky: 380,
  refresco: 35,
  squirt: 35,
  clamato: 45,
  sangrita: 80,
  jugoNaranja: 25,
  hielo: 30,
  limones: 15,
  vasos: 35,
  cacahuates: 25,
  papas: 20,
  tajin: 30,
  chicharron: 35,
  totopos: 30,
  frituras: 25,
}

export const SNACK_OPTIONS: { key: SnackKey; emoji: string; label: string; desc: string }[] = [
  { key: 'cacahuates', emoji: '🥜', label: 'Cacahuates', desc: 'Bolsas 200g' },
  { key: 'papas', emoji: '🍟', label: 'Papas fritas', desc: 'Sabritas / Ruffles' },
  { key: 'chicharron', emoji: '🐷', label: 'Chicharrón', desc: 'Bolsas botana' },
  { key: 'totopos', emoji: '🌮', label: 'Totopos + salsa', desc: 'Con bote de salsa' },
  { key: 'frituras', emoji: '🫙', label: 'Frituras variadas', desc: 'Doritos, Cheetos…' },
]

export const COCKTAILS: CocktailInfo[] = [
  {
    key: 'michelada',
    emoji: '🍺',
    name: 'Michelada',
    base: 'Cerveza',
    ingredients: 'Clamato, Tajín, chile piquín, limones, sal',
  },
  {
    key: 'paloma',
    emoji: '🕊️',
    name: 'Paloma',
    base: 'Tequila',
    ingredients: 'Squirt/toronja, limones, sal',
  },
  {
    key: 'charro-negro',
    emoji: '🤠',
    name: 'Charro Negro',
    base: 'Tequila',
    ingredients: 'Coca Cola, limones',
  },
  {
    key: 'mezcalina',
    emoji: '🧉',
    name: 'Mezcalina',
    base: 'Mezcal',
    ingredients: 'Jugo naranja, limones, sal',
  },
  {
    key: 'cuba-libre',
    emoji: '🍹',
    name: 'Cuba Libre',
    base: 'Ron',
    ingredients: 'Coca Cola, limones',
  },
  {
    key: 'clamato-preparado',
    emoji: '🌶️',
    name: 'Clamato preparado',
    base: 'Sin alcohol',
    ingredients: 'Clamato, pepino, chamoy, Tajín, limones',
  },
  {
    key: 'whisky-coke',
    emoji: '🥃',
    name: 'Whisky con Coke',
    base: 'Whisky',
    ingredients: 'Coca Cola, hielo',
  },
  {
    key: 'vampiro',
    emoji: '🧛',
    name: 'Vampiro',
    base: 'Tequila',
    ingredients: 'Squirt/toronja, sangrita, Tajín, limones, sal',
  },
]

export const EVENT_OPTIONS: { value: EventType; label: string; emoji: string }[] = [
  { value: 'carne-asada', label: 'Carne asada', emoji: '🥩' },
  { value: 'cumpleanos', label: 'Cumpleaños', emoji: '🎂' },
  { value: 'xv-boda', label: 'XV / Boda', emoji: '💍' },
  { value: 'posada', label: 'Posada', emoji: '🎄' },
  { value: 'casual', label: 'Reunión casual', emoji: '🙌' },
]

export const GUEST_OPTIONS: {
  value: GuestType
  label: string
  emoji: string
  desc: string
}[] = [
  { value: 'tranquilos', label: 'Tranquilos', emoji: '😇', desc: 'Van a tomar poquito' },
  { value: 'normal', label: 'Normal', emoji: '🍺', desc: 'Ni tanto ni muy poco' },
  { value: 'lemueven', label: 'Le mueven', emoji: '🔥', desc: 'Van con todo' },
]
