import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Calcuchela',
  description: 'Política de privacidad de Calcuchela. Conoce cómo usamos la información en nuestro sitio.',
  alternates: { canonical: 'https://calcuchela.com/privacidad' },
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-gradient-to-b from-amber-500 to-amber-600 px-5 pt-10 pb-12 text-white">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-amber-100 text-sm font-medium hover:text-white">
            ← Regresar a Calcuchela
          </Link>
          <h1 className="text-3xl font-black tracking-tight mt-3">Política de Privacidad</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-5 pb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 space-y-5 text-gray-700 text-sm leading-relaxed">
          <p className="text-gray-500 text-xs">Última actualización: junio 2026</p>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">1. Información general</h2>
            <p>
              Calcuchela (<strong>calcuchela.com</strong>) es una herramienta gratuita que ayuda a
              calcular bebidas y botanas para fiestas. No recopilamos ni almacenamos información
              personal de nuestros usuarios.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">2. Datos que NO recopilamos</h2>
            <p>Calcuchela no requiere registro ni cuenta. No almacenamos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nombres, correos electrónicos ni datos personales</li>
              <li>Los datos que ingresas en la calculadora (se procesan solo en tu dispositivo)</li>
              <li>Contraseñas ni información de pago</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">3. Cookies y tecnologías de rastreo</h2>
            <p>
              Podemos utilizar servicios de terceros como <strong>Google Analytics</strong> y{' '}
              <strong>Google AdSense</strong> para medir el tráfico del sitio y mostrar anuncios
              relevantes. Estos servicios pueden usar cookies propias para funcionar. Puedes
              desactivar las cookies en la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">4. Publicidad</h2>
            <p>
              Este sitio puede mostrar anuncios a través de Google AdSense. Google puede usar
              cookies para mostrar anuncios basados en tus visitas previas a este y otros sitios
              web. Puedes optar por no recibir publicidad personalizada visitando{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 underline"
              >
                Configuración de anuncios de Google
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">5. Enlaces externos</h2>
            <p>
              Nuestro sitio contiene enlaces a otros sitios como{' '}
              <a
                href="https://calcuasada.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 underline"
              >
                calcuasada.com
              </a>
              . No somos responsables de las prácticas de privacidad de sitios externos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">6. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política en cualquier momento. Los cambios serán publicados
              en esta página con la fecha de actualización correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">7. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política, puedes contactarnos en{' '}
              <a href="mailto:hola@calcuchela.com" className="text-amber-600 underline">
                hola@calcuchela.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        Hecho con 🍺 en México · Calcuchela 2026
      </footer>
    </div>
  )
}
