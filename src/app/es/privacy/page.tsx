import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/BlinkAppIcon';
import Footer from '@/components/Footer';
import { COLORS, CONTACT_EMAIL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Blanked: qué datos recopilamos, cómo los usamos, con quién los compartimos y tus derechos. Nunca vendemos tus datos.',
  alternates: {
    canonical: `${SITE_URL}/es/privacy`,
    languages: {
      'en-GB': `${SITE_URL}/privacy`,
      'es-ES': `${SITE_URL}/es/privacy`,
      'x-default': `${SITE_URL}/privacy`,
    },
  },
  openGraph: {
    title: 'Política de Privacidad | Blanked',
    description: 'Qué datos recopilamos, cómo los usamos, con quién los compartimos y tus derechos. Nunca vendemos tus datos.',
    url: `${SITE_URL}/es/privacy`,
    locale: 'es_ES',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary',
    title: 'Política de Privacidad | Blanked',
    description: 'Qué datos recopilamos, cómo los usamos y tus derechos.',
  },
};

const sectionStyle: React.CSSProperties = { marginBottom: 36 };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 12 };
const h3Style: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 8, marginTop: 16 };
const pStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12, paddingLeft: 24 };
const linkStyle: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };

export default function PrivacyPageES() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto", background: COLORS.bg, minHeight: "100vh" }}>
      {/* NAV */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" aria-label="Blanked inicio" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={36} />
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>
            <span style={{ color: COLORS.accent }}>Blanked</span>
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 }}>Política de Privacidad</h1>
        <p style={{ fontSize: 14, color: COLORS.textD, marginBottom: 40 }}>Última actualización: 14 de abril de 2026</p>

        <div style={sectionStyle}>
          <p style={pStyle}>
            Creamos Blanked porque nos encantan los juegos de memoria y respetamos a quienes los juegan. Esta política explica, en español sencillo, qué datos recopilamos, por qué los recopilamos, con quién los compartimos y qué derechos tienes. Sin patrones oscuros, sin vender tus datos, sin sorpresas.
          </p>
          <p style={pStyle}>
            Si hay algo que no te queda claro, escríbenos a{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>
            {' '}y te lo explicamos.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Quiénes somos</h2>
          <p style={pStyle}>
            Blanked se opera desde Gibraltar. Cuando en esta política decimos &laquo;Blanked&raquo;, &laquo;nosotros&raquo; o &laquo;nuestro&raquo;, nos referimos a los operadores de la aplicación móvil Blanked y este sitio web. Somos el responsable del tratamiento de los datos personales que se describen a continuación.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Qué recopilamos</h2>
          <p style={pStyle}>Esto es todo lo que recopilamos, y por qué.</p>

          <h3 style={h3Style}>Información de la cuenta</h3>
          <ul style={ulStyle}>
            <li><strong>ID de cuenta</strong>: un UUID aleatorio que genera nuestro sistema de autenticación para diferenciar a una persona jugadora de otra</li>
            <li><strong>Correo electrónico</strong>: de Apple Sign In (puede ser una dirección real o la dirección privada de reenvío de Apple, tú eliges) o del registro por correo. Lo usamos únicamente para la recuperación de la cuenta y correos importantes relacionados con ella. No enviamos marketing salvo que lo autorices expresamente.</li>
            <li><strong>Nombre de usuario</strong>: el que tú elijas; visible para tus amistades y en las clasificaciones</li>
            <li><strong>Foto de perfil</strong>: solo si subes una. Se guarda en Supabase Storage.</li>
          </ul>

          <h3 style={h3Style}>Datos de juego</h3>
          <ul style={ulStyle}>
            <li>Niveles jugados, estrellas obtenidas, progreso de mundos, promedios de puntuación de memoria</li>
            <li>Uso de potenciadores, gemas ganadas y gastadas, registros de compras dentro de la aplicación</li>
            <li>Marcas temporales de actividad diaria (para el seguimiento de rachas)</li>
            <li>Longitud de la racha, escudos de racha disponibles y fecha de la última partida (para recuperar rachas)</li>
            <li>Indicador de tutorial visto (para no mostrar el tutorial dos veces)</li>
            <li>Configuración cosmética equipada (marco, banner, expresión del avatar)</li>
            <li>Estado de suscripción (para la ventaja de Blanked+)</li>
            <li>Preferencias de notificaciones</li>
          </ul>
          <p style={pStyle}>
            Usamos estos datos para guardar tu progreso, equilibrar la dificultad del juego, alimentar nuestro panel interno de análisis (para saber qué niveles son demasiado difíciles o fáciles) y ofrecerte las funciones de suscripción que hayas pagado.
          </p>

          <h3 style={h3Style}>Datos sociales</h3>
          <ul style={ulStyle}>
            <li>Conexiones de amistad (a quién has añadido o aceptado)</li>
            <li>Resultados de los duelos cara a cara con tus amistades</li>
          </ul>

          <h3 style={h3Style}>Datos técnicos y del dispositivo</h3>
          <ul style={ulStyle}>
            <li><strong>Token de notificaciones push</strong>: un identificador anónimo del dispositivo que nos proporciona Expo, para poder enviarte recordatorios de rachas y avisos de duelos (solo con tu permiso)</li>
            <li><strong>Identificador de publicidad (IDFA en iOS)</strong>: <em>solo</em> si concedes el permiso de App Tracking Transparency. Si dices que no (o no respondes), te servimos anuncios no personalizados. Puedes cambiarlo en cualquier momento en Ajustes de iOS &rarr; Privacidad &rarr; Seguimiento.</li>
            <li><strong>Dirección IP</strong>: la ven las redes publicitarias y nuestro proveedor de alojamiento como parte normal del tráfico de internet. No se guarda en la base de datos de la aplicación.</li>
          </ul>

          <h3 style={h3Style}>Datos de compra</h3>
          <ul style={ulStyle}>
            <li>Registros de transacciones de compras dentro de la aplicación (procesadas por Apple: <em>nunca vemos tu tarjeta ni tus datos de pago</em>)</li>
            <li>Estado de suscripción en RevenueCat (para Blanked+)</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Qué no recopilamos</h2>
          <ul style={ulStyle}>
            <li>Tu nombre real, salvo que decidas incluirlo en tu nombre de usuario o nombre público</li>
            <li>Tu ubicación (no usamos GPS ni APIs de geolocalización)</li>
            <li>Tus contactos ni agenda</li>
            <li>Tu carrete ni tus fotos (aparte de la foto de perfil que subas explícitamente)</li>
            <li>Tu historial de navegación</li>
            <li>Tu micrófono ni tu cámara en tiempo real</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Qué pueden ver otras personas jugadoras</h2>
          <p style={pStyle}>Cuando te conectas con amistades en Blanked, pueden ver:</p>
          <ul style={ulStyle}>
            <li>Tu nombre de usuario</li>
            <li>Tu foto de perfil (si la has subido)</li>
            <li>Los cosméticos que llevas equipados: marco, banner, expresión del avatar</li>
            <li>Tus estrellas totales, el mundo más alto alcanzado, tu promedio de puntuación de memoria y la longitud actual de tu racha</li>
            <li>Los resultados de los duelos cara a cara que hayas jugado con ellas</li>
            <li>Tu estado: en línea, recientemente activa o desconectada</li>
          </ul>
          <p style={pStyle}>
            Tu correo electrónico, tu ID de cuenta, tu historial de compras, tus escudos de racha y las marcas temporales de actividad diaria <strong>nunca</strong> se muestran a otras personas jugadoras.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Servicios de terceros</h2>
          <p style={pStyle}>Blanked utiliza los siguientes servicios. Cada uno recibe el mínimo de datos necesarios para funcionar.</p>
          <ul style={ulStyle}>
            <li><strong>Supabase</strong>: nuestro proveedor de base de datos y autenticación. Guarda tu cuenta, tus datos de juego, la foto de perfil y las conexiones de amistad. Servidores ubicados en la UE (Londres, eu-west-2).</li>
            <li><strong>Apple Sign In</strong>: autenticación. Apple nos entrega tu ID de cuenta y bien tu correo real, bien una dirección privada de reenvío (tú decides).</li>
            <li><strong>RevenueCat</strong>: gestiona las ventajas de la suscripción (Blanked+). Ve tus recibos de compra de Apple, pero no tus datos de tarjeta.</li>
            <li><strong>Expo</strong>: notificaciones push. Guarda el token anónimo que usamos para enviarte recordatorios de rachas y avisos de duelos.</li>
            <li><strong>Google AdMob</strong> (mediante <code>react-native-google-mobile-ads</code>): publica publicidad dentro de la aplicación. AdMob puede recopilar tu identificador de publicidad del dispositivo, dirección IP y datos de interacción con anuncios. Si has concedido el permiso de App Tracking Transparency, los anuncios podrán ser personalizados; si no, serán no personalizados. Consulta{' '}
              <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer" style={linkStyle}>la política de privacidad de Google</a> para más detalles.
            </li>
            <li><strong>App Store de Apple</strong>: procesa tus compras dentro de la aplicación. Se rige por{' '}
              <a href="https://www.apple.com/legal/privacy/es/" target="_blank" rel="noopener noreferrer" style={linkStyle}>la política de privacidad de Apple</a>.
            </li>
          </ul>
          <p style={pStyle}>
            En el futuro podemos añadir <strong>Sentry</strong> para informes de caídas. Actualizaremos esta política y avisaremos a las personas usuarias antes de que esto ocurra.
          </p>
          <p style={pStyle}>
            <strong>No vendemos tus datos.</strong> Ni a anunciantes, ni a intermediarios de datos, ni a nadie. Los datos solo se comparten con los servicios anteriores, y únicamente en la medida necesaria para que funcionen.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Publicidad y seguimiento</h2>
          <p style={pStyle}>
            Blanked muestra anuncios de Google AdMob para sostener la experiencia gratuita. En iOS, Apple nos obliga a pedir tu permiso antes de hacer seguimiento entre aplicaciones (App Tracking Transparency). Cuando abras Blanked por primera vez, verás el aviso estándar de Apple.
          </p>
          <ul style={ulStyle}>
            <li>Si <strong>permites el seguimiento</strong>, AdMob podrá usar tu identificador de publicidad del dispositivo (IDFA) para mostrarte anuncios más relevantes</li>
            <li>Si <strong>no permites el seguimiento</strong>, AdMob te servirá anuncios no personalizados basados solo en señales generales como la categoría de la aplicación</li>
            <li>Puedes cambiar tu elección en cualquier momento en <strong>Ajustes &rarr; Privacidad y Seguridad &rarr; Seguimiento</strong>, o desactivar totalmente los anuncios personalizados en <strong>Ajustes &rarr; Privacidad y Seguridad &rarr; Publicidad de Apple</strong></li>
          </ul>
          <p style={pStyle}>
            Quienes tienen Blanked+ no ven anuncios.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Transferencias internacionales de datos</h2>
          <p style={pStyle}>
            Nuestras bases de datos están alojadas por Supabase en la UE (Londres, <code>eu-west-2</code>). Algunos de nuestros otros proveedores —Apple, Google (AdMob) y Expo— pueden procesar tus datos en Estados Unidos u otros países. Cuando se transfieren datos personales fuera del Reino Unido, del EEE o de Gibraltar, aplicamos las Cláusulas Contractuales Tipo (SCC) aprobadas por las autoridades correspondientes para garantizar que tus datos estén protegidos con un nivel equivalente.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Base legal del tratamiento</h2>
          <p style={pStyle}>
            Si estás en el Reino Unido, el EEE o Gibraltar, nos basamos en alguna de las siguientes bases legales para cada tipo de tratamiento:
          </p>
          <ul style={ulStyle}>
            <li><strong>Contrato</strong>: para prestar el servicio de Blanked al que te has dado de alta (gestión de la cuenta, juego, compras, ventajas de suscripción, funciones sociales)</li>
            <li><strong>Interés legítimo</strong>: análisis de equilibrio del juego, prevención de fraude y mejora del producto. Puedes oponerte a este tratamiento en cualquier momento (ver &laquo;Tus derechos&raquo; más abajo).</li>
            <li><strong>Consentimiento</strong>: publicidad personalizada (cuando hayas concedido el permiso de App Tracking Transparency), notificaciones push y correos de marketing opcionales. Puedes retirar el consentimiento cuando quieras.</li>
            <li><strong>Obligación legal</strong>: conservar registros de compras para el cumplimiento de la normativa fiscal y de consumo</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Tus derechos</h2>
          <p style={pStyle}>
            Según la normativa de protección de datos de Gibraltar, el Reino Unido y la UE, tienes los siguientes derechos. Responderemos a cualquier solicitud en un plazo de 30 días.
          </p>
          <ul style={ulStyle}>
            <li><strong>Derecho de acceso</strong>: solicitar una copia de los datos personales que tenemos sobre ti</li>
            <li><strong>Derecho de rectificación</strong>: corregir datos inexactos o incompletos</li>
            <li><strong>Derecho de supresión</strong> (&laquo;derecho al olvido&raquo;): borrar tu cuenta y todos los datos asociados. Puedes hacerlo tú mismo cuando quieras desde <strong>Ajustes &rarr; Perfil &rarr; Borrar cuenta</strong> dentro de la aplicación, o escribiéndonos.</li>
            <li><strong>Derecho a la portabilidad</strong>: recibir tus datos en un formato portable y legible por máquina</li>
            <li><strong>Derecho a limitar el tratamiento</strong>: pedirnos que pausemos determinados usos de tus datos</li>
            <li><strong>Derecho de oposición</strong>: oponerte al tratamiento basado en el interés legítimo (p. ej. analítica) o al marketing directo</li>
            <li><strong>Derecho a retirar el consentimiento</strong>: para cualquier cosa que hayas consentido previamente (como la publicidad personalizada o las notificaciones push)</li>
            <li><strong>Derecho a reclamar</strong> ante tu autoridad local de protección de datos:
              <ul style={{ ...ulStyle, marginTop: 6, paddingLeft: 20 }}>
                <li>Gibraltar: Gibraltar Regulatory Authority:{' '}
                  <a href="https://www.gra.gi" target="_blank" rel="noopener noreferrer" style={linkStyle}>gra.gi</a>
                </li>
                <li>Reino Unido: Information Commissioner&apos;s Office:{' '}
                  <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={linkStyle}>ico.org.uk</a>
                </li>
                <li>España: Agencia Española de Protección de Datos:{' '}
                  <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style={linkStyle}>aepd.es</a>
                </li>
                <li>UE: tu autoridad nacional de control (consulta{' '}
                  <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" style={linkStyle}>edpb.europa.eu</a>)
                </li>
              </ul>
            </li>
          </ul>
          <p style={pStyle}>
            Para ejercer cualquiera de estos derechos, escribe a{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Conservación de datos</h2>
          <ul style={ulStyle}>
            <li><strong>Datos de la cuenta</strong>: se conservan mientras la cuenta esté activa. Cuando borras tu cuenta (desde la aplicación o por petición), los eliminamos de nuestros sistemas activos en un plazo de 30 días.</li>
            <li><strong>Copias de seguridad</strong>: Supabase guarda copias cifradas durante un máximo de 7 días tras la eliminación para recuperación ante desastres. Pasado ese plazo, tus datos son irrecuperables.</li>
            <li><strong>Eventos analíticos</strong> (datos de equilibrio y economía del juego): se conservan hasta 24 meses, tras lo cual se anonimizan o eliminan</li>
            <li><strong>Registros de compras</strong>: se conservan durante el tiempo exigido por la normativa fiscal y de consumo (normalmente 6 años en el Reino Unido y Gibraltar)</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Seguridad de los datos</h2>
          <p style={pStyle}>
            Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos personales: conexiones cifradas (HTTPS/TLS en todo), seguridad a nivel de fila en la base de datos, tokens de autenticación con hash y acceso mínimo para nuestro equipo. Ninguna transmisión o sistema de almacenamiento en internet es 100% seguro, pero nos lo tomamos muy en serio y tratamos cualquier brecha como la emergencia que es.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Privacidad de menores</h2>
          <p style={pStyle}>
            Blanked tiene clasificación 4+ en la App Store: es un juego de memoria sin contenido violento ni para personas adultas. Dicho esto, no recopilamos a sabiendas datos personales de menores de 13 años (o la edad equivalente en tu país, que puede ser hasta 16 en algunos Estados miembros de la UE) sin el consentimiento verificable de su madre, padre o tutor.
          </p>
          <p style={pStyle}>
            Si eres madre, padre o tutor y crees que tu hija o hijo se ha registrado sin tu permiso, escríbenos a{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>
            {' '}y borraremos la cuenta con diligencia.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Cambios en esta política</h2>
          <p style={pStyle}>
            Podemos actualizar esta Política de Privacidad de vez en cuando. Cuando hagamos cambios importantes —como añadir un nuevo servicio de terceros o cambiar cómo usamos tus datos— te avisaremos en la aplicación antes de que entren en vigor. La fecha de &laquo;Última actualización&raquo; al principio de esta página siempre refleja la versión vigente.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Contacto</h2>
          <p style={pStyle}>
            ¿Dudas sobre esta política? ¿Quieres ejercer tus derechos sobre tus datos? Responde a cualquiera de nuestros correos, o contacta directamente:
          </p>
          <p style={pStyle}>
            <strong>Correo</strong>:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>
          </p>
          <p style={pStyle}>
            Las personas usuarias del Reino Unido, el EEE o Gibraltar pueden dirigirse a nuestro contacto de protección de datos en la misma dirección.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
