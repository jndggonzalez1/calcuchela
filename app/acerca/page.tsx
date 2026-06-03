import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acerca de Calcuchela — La historia de Yeyito y las chelas',
  description:
    'La historia detrás de Calcuchela: cómo una fiesta mal calculada inspiró la calculadora de bebidas más útil de México.',
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
          <h1 className="text-3xl font-black tracking-tight mt-3">La historia detrás de Calcuchela</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-5 pb-20 space-y-4">

        {/* Historia principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p className="text-4xl">🍺</p>

          <p>
            <strong className="text-gray-900">Yeyito</strong> — así le dicen sus cuates — es el tipo de persona que siempre termina organizando la fiesta. No porque sea el más organizado, sino porque es el que más ganas le echa.
          </p>

          <p>
            Un sábado, con 30 invitados confirmados y la confianza de quien ya ha armado varias, fue al súper y compró "lo suficiente": un par de sixpacks, unos refrescos, una bolsa de hielo y cacahuates de buena fe.
          </p>

          <p>
            A las 8 de la noche, con la fiesta en su mejor momento, pasó lo inevitable: <strong className="text-gray-900">se acabaron las chelas.</strong>
          </p>

          <p>
            Hubo que hacer una corrida de emergencia. No una — dos. El segundo viaje fue de madrugada, con el primo Beto de copiloto y la vergüenza tatuada en la frente.
          </p>

          <p>
            Al día siguiente, con la resaca todavía presente, Yeyito se hizo la pregunta que todo organizador de fiesta mexicano se ha hecho al menos una vez:
          </p>

          <p className="text-lg font-bold text-amber-700 text-center py-2">
            "¿Por qué no existe una calculadora que te diga exactamente cuánto comprar?"
          </p>

          <p>
            La respuesta fue simple: porque nadie la había hecho todavía. Así que la hizo él.
          </p>
        </div>

        {/* Por qué existe */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-base font-bold text-gray-900">¿Para qué sirve Calcuchela?</h2>
          <p>
            Calcuchela es una calculadora gratuita que te dice cuántas cervezas, refrescos, hielo, limones y botanas necesitas según el número de invitados, el tipo de evento y cuántas horas dura.
          </p>
          <p>
            No necesitas cuenta ni registro. Llegas, metes los datos, y te da la lista del súper lista para compartir por WhatsApp.
          </p>
          <ul className="space-y-1.5 mt-2">
            {[
              '🍺 Cervezas en six-packs, cajas o unidades sueltas',
              '🥃 Destilados para cocteles: tequila, mezcal, ron, whisky',
              '🧃 Refrescos, Clamato, Squirt, Sangrita, jugos',
              '🧊 Hielo, limones, vasos y más esenciales',
              '🥜 Botanas opcionales: cacahuates, papas, chicharrón, totopos',
              '💰 Estimador de costo con precios editables',
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Calcuasada crosslink */}
        <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5 text-center">
          <p className="text-orange-900 font-medium text-sm">
            ¿También organizas carne asada? Yeyito también hizo la calculadora para eso:
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

        {/* Contacto */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-base font-bold text-gray-900 mb-2">¿Algo que mejorar?</h2>
          <p>
            Si tienes sugerencias, encontraste algo raro, o simplemente quieres contar tu propia historia de fiesta mal calculada, escríbenos:
          </p>
          <a href="mailto:hola@calcuchela.com" className="inline-block mt-2 text-amber-600 font-bold underline underline-offset-2">
            hola@calcuchela.com
          </a>
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
