import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calcuchela — Calculadora de bebidas para fiestas mexicanas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 120,
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          🍺
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-2px',
            marginBottom: 16,
          }}
        >
          Calcuchela
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#fef3c7',
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Calcula cuántas chelas necesitas para tu fiesta
        </div>
        <div
          style={{
            marginTop: 40,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 16,
            padding: '12px 32px',
            fontSize: 24,
            color: 'white',
            fontWeight: 600,
          }}
        >
          calcuchela.com
        </div>
      </div>
    ),
    { ...size }
  )
}
