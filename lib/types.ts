export type EventType = 'carne-asada' | 'cumpleanos' | 'xv-boda' | 'posada' | 'casual'
export type GuestType = 'tranquilos' | 'normal' | 'lemueven'
export type CocktailKey =
  | 'michelada'
  | 'paloma'
  | 'charro-negro'
  | 'mezcalina'
  | 'cuba-libre'
  | 'clamato-preparado'
  | 'whisky-coke'
  | 'vampiro'

export interface CocktailInfo {
  key: CocktailKey
  emoji: string
  name: string
  base: string
  ingredients: string
}

export interface RecipePortion {
  ingredient: string
  amount: string
}

export interface CocktailRecipe {
  slug: string
  key: CocktailKey
  emoji: string
  name: string
  base: string
  description: string
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  time: string
  glassType: string
  portions: RecipePortion[]
  steps: string[]
  tip?: string
  searchTitle: string
}

export interface CalculationResult {
  cerveza: { units: number; sixPacks: number; cajas: number }
  tequila: number
  mezcal: number
  ron: number
  whisky: number
  refresco: number
  squirt: number
  jugoNaranja: number
  clamato: number
  sangrita: number
  aguaFresca: number
  hielo: number
  limones: number
  sal: number
  chilePiquin: number
  tajin: number
  pepino: number
  vasos: number
  cacahuates: number
  papas: number
}

export interface Prices {
  cerveza: number
  tequila: number
  mezcal: number
  ron: number
  whisky: number
  refresco: number
  squirt: number
  clamato: number
  sangrita: number
  jugoNaranja: number
  hielo: number
  limones: number
  vasos: number
  cacahuates: number
  papas: number
  tajin: number
}
