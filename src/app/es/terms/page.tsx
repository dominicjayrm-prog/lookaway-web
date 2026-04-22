import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/BlinkAppIcon';
import Footer from '@/components/Footer';
import { COLORS, CONTACT_EMAIL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Términos del Servicio',
  description: 'Términos del servicio de Blanked: las reglas para usar nuestro juego de memoria visual, las suscripciones Blanked+, las compras dentro de la aplicación, la moneda virtual y tu cuenta.',
  alternates: {
    canonical: `${SITE_URL}/es/terms`,
    languages: {
      'en-GB': `${SITE_URL}/terms`,
      'es-ES': `${SITE_URL}/es/terms`,
      'x-default': `${SITE_URL}/terms`,
    },
  },
  openGraph: {
    title: 'Términos del Servicio | Blanked',
    description: 'Las reglas para usar Blanked: cuentas, suscripciones, compras dentro de la aplicación y moneda virtual.',
    url: `${SITE_URL}/es/terms`,
    locale: 'es_ES',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary',
    title: 'Términos del Servicio | Blanked',
    description: 'Las reglas para usar Blanked: cuentas, suscripciones y compras.',
  },
};

const sectionStyle: React.CSSProperties = { marginBottom: 36 };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 12 };
const pStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12, paddingLeft: 24 };
const linkStyle: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
const tldrStyle: React.CSSProperties = {
  fontSize: 14, color: COLORS.accent, fontWeight: 600, padding: '8px 14px',
  background: `${COLORS.accent}08`, borderRadius: 8, marginBottom: 14,
  borderLeft: `3px solid ${COLORS.accent}`,
};

export default function TermsPageES() {
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
        <h1 style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 }}>Términos del Servicio</h1>
        <p style={{ fontSize: 14, color: COLORS.textD, marginBottom: 40 }}>Última actualización: 14 de abril de 2026</p>

        <div style={sectionStyle}>
          <p style={pStyle}>
            Estos Términos del Servicio (&laquo;Términos&raquo;) rigen tu uso de la aplicación móvil Blanked, nuestro sitio web y cualquier servicio relacionado (en conjunto, la &laquo;Aplicación&raquo;). Blanked se opera desde Gibraltar. Al usar la Aplicación, aceptas estos Términos.
          </p>
          <p style={pStyle}>
            Si no estás de acuerdo con alguna parte de estos Términos, por favor no uses la Aplicación.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Aceptación de los Términos</h2>
          <p style={pStyle}>
            Al descargar, instalar o usar Blanked, confirmas que has leído, entendido y aceptas quedar vinculado por estos Términos y por nuestra{' '}
            <Link href="/es/privacy" style={linkStyle}>Política de Privacidad</Link>. Si usas la Aplicación en nombre de una persona menor a tu cargo, aceptas estos Términos en su nombre.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Descripción del Servicio</h2>
          <p style={pStyle}>
            Blanked es un juego de memoria visual disponible en iOS. La Aplicación incluye:
          </p>
          <ul style={ulStyle}>
            <li>Un juego base gratuito con más de 380 niveles repartidos en 6 modos de juego, duelos cara a cara con amistades y publicidad opcional dentro de la aplicación</li>
            <li><strong>Blanked+</strong>: una suscripción de renovación automática que desbloquea vidas ilimitadas, cosméticos exclusivos y elimina los anuncios (disponible en plan mensual o anual)</li>
            <li>Compras únicas opcionales dentro de la aplicación, como packs de gemas y la mejora &laquo;Quitar anuncios&raquo;</li>
          </ul>
          <p style={pStyle}>
            Se requiere una cuenta para jugar a Blanked. Inicias sesión con Apple Sign In o con correo electrónico al abrir la aplicación por primera vez. Esto nos permite guardar tu progreso, tus rachas, tus gemas y tus conexiones con amistades, y mantenerlos sincronizados entre dispositivos.
          </p>
          <p style={pStyle}>
            Los anuncios que aparecen en la versión gratuita se pueden quitar comprando &laquo;Quitar anuncios&raquo; o suscribiéndote a Blanked+.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Edad mínima</h2>
          <p style={pStyle}>
            Debes tener al menos 13 años para usar Blanked (o la edad mínima de consentimiento digital de tu país, que puede llegar a 16 en algunos Estados miembros de la UE). Si eres menor de 18, confirmas que tienes permiso de tu madre, padre o tutor legal para usar la Aplicación y para realizar cualquier compra.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Cuentas de usuario</h2>
          <p style={pStyle}>
            Para acceder a las funciones sociales, de sincronización en la nube y de compra, puedes crear una cuenta con Apple Sign In o con registro por correo electrónico. Aceptas:
          </p>
          <ul style={ulStyle}>
            <li>Elegir un nombre de usuario que no sea ofensivo, engañoso, suplante a otra persona ni infrinja marcas comerciales o derechos de propiedad intelectual de nadie</li>
            <li>Mantener a salvo tus credenciales: eres responsable de toda la actividad que se realice con tu cuenta</li>
            <li>No compartir tu cuenta con otras personas, no venderla ni cederla</li>
          </ul>
          <p style={pStyle}>
            Nos reservamos el derecho de suspender o cancelar cualquier cuenta que incumpla estos Términos, a nuestra entera discreción.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Términos de la suscripción Blanked+</h2>
          <div style={tldrStyle}>
            Resumen: Blanked+ se renueva automáticamente al final de cada periodo. Puedes cancelar cuando quieras en los ajustes de tu Apple ID, al menos 24 horas antes de la próxima renovación.
          </div>
          <p style={pStyle}>
            Blanked+ es una suscripción de renovación automática con un periodo de facturación mensual o anual. Se aplican las siguientes condiciones:
          </p>
          <ul style={ulStyle}>
            <li><strong>Precio y duración</strong>: la duración y el precio de la suscripción se indican claramente en el momento de la compra dentro de la Aplicación</li>
            <li><strong>Pago</strong>: el pago se carga en tu cuenta de Apple ID al confirmar la compra</li>
            <li><strong>Renovación automática</strong>: tu suscripción se renueva automáticamente salvo que desactives la renovación al menos 24 horas antes del final del periodo en curso</li>
            <li><strong>Cargo de renovación</strong>: tu Apple ID recibirá el cargo de la renovación dentro de las 24 horas previas al final del periodo en curso, al precio del plan de suscripción vigente</li>
            <li><strong>Gestión de la suscripción</strong>: puedes gestionar tu suscripción y desactivar la renovación automática en los ajustes de tu Apple ID después de la compra: <strong>Ajustes &rarr; [tu nombre] &rarr; Suscripciones</strong></li>
            <li><strong>Sin cancelación a mitad de periodo</strong>: cancelar no activa un reembolso del periodo actual; mantendrás el acceso a Blanked+ hasta el final del periodo pagado</li>
            <li><strong>Periodos de prueba gratuita</strong>: cualquier parte no usada de un periodo de prueba gratuita se pierde al contratar una suscripción</li>
          </ul>
          <p style={pStyle}>
            Los enlaces a estos Términos y a nuestra{' '}
            <Link href="/es/privacy" style={linkStyle}>Política de Privacidad</Link>
            {' '}están disponibles desde la pantalla de compra dentro de la Aplicación.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Compras dentro de la aplicación</h2>
          <p style={pStyle}>
            Blanked ofrece dos tipos de compras dentro de la aplicación:
          </p>
          <ul style={ulStyle}>
            <li><strong>Compras únicas</strong>: como los packs de gemas y la mejora &laquo;Quitar anuncios&raquo;. No son recurrentes.</li>
            <li><strong>Suscripciones</strong>: Blanked+, como se describe en la sección 5</li>
          </ul>
          <p style={pStyle}>
            Todas las compras se procesan a través de la App Store de Apple. Nosotros no procesamos pagos directamente y no tenemos acceso a tu tarjeta ni a tus datos de pago.
          </p>
          <p style={pStyle}>
            <strong>Todas las compras son finales.</strong> Las solicitudes de reembolso se deben presentar a Apple dentro de su plazo y están sujetas a{' '}
            <a href="https://support.apple.com/es-es/HT204084" target="_blank" rel="noopener noreferrer" style={linkStyle}>la política de reembolsos de Apple</a>. Nosotros no emitimos reembolsos directamente. Si tienes derecho a un reembolso por ley aplicable (por ejemplo, por un producto defectuoso), ese derecho no se ve afectado.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Moneda virtual (gemas)</h2>
          <div style={tldrStyle}>
            Resumen: las gemas son una moneda del juego. No son dinero real, no se pueden cobrar y no son reembolsables salvo que lo exija la ley.
          </div>
          <ul style={ulStyle}>
            <li>Las gemas son una moneda virtual del juego <strong>sin valor monetario en el mundo real</strong></li>
            <li>Las gemas no se pueden canjear por dinero, vender, regalar ni transferir entre cuentas</li>
            <li>Las gemas compradas no son reembolsables salvo cuando lo exija la ley. Las solicitudes de reembolso de gemas se deben tramitar a través de Apple</li>
            <li>Podemos ajustar los precios de las gemas, los costes de los potenciadores y las recompensas en cualquier momento como parte del equilibrio normal del juego</li>
            <li>Si se cancela tu cuenta por incumplir estos Términos, las gemas, los cosméticos y el progreso que queden se pierden</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Conducta del usuario</h2>
          <p style={pStyle}>Al usar Blanked, aceptas no:</p>
          <ul style={ulStyle}>
            <li>Usar trampas, exploits, software de automatización, clientes modificados ni herramientas de terceros no autorizadas</li>
            <li>Acosar, maltratar, amenazar ni enviar contenido ofensivo a otras personas jugadoras mediante los duelos o cualquier otra función</li>
            <li>Suplantar a otra persona, empresa o marca, ni tergiversar tu identidad</li>
            <li>Elegir un nombre de usuario (o subir contenido) que infrinja los derechos de propiedad intelectual de terceros</li>
            <li>Intentar acceder sin autorización a la Aplicación, a nuestros servidores o a las cuentas de otras personas</li>
            <li>Intentar saltarte la ventana de recuperación de rachas, el flujo de compras dentro de la aplicación, la visualización de anuncios o cualquier otro mecanismo de economía o de juego</li>
            <li>Interferir o alterar el funcionamiento normal de la Aplicación, incluido el envío de datos falsos o fraudulentos</li>
            <li>Usar la Aplicación para cualquier fin ilegal</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Contenido generado por el usuario</h2>
          <p style={pStyle}>
            Cuando eliges un nombre de usuario, subes una foto de perfil o aportas contenido a la Aplicación, nos concedes una licencia mundial, no exclusiva, libre de regalías y con derecho a sublicenciar para usar, alojar, almacenar, mostrar y reproducir ese contenido con el fin de operar y prestar la Aplicación: por ejemplo, mostrar tu nombre de usuario en clasificaciones o tu avatar a tus amistades.
          </p>
          <p style={pStyle}>
            Declaras y garantizas que eres titular, o tienes todos los derechos necesarios, sobre cualquier contenido que subas, y que no infringe los derechos de terceros ni ninguna ley aplicable.
          </p>
          <p style={pStyle}>
            Nos reservamos el derecho de eliminar cualquier contenido (nombres de usuario, fotos de perfil u otras aportaciones) que incumpla estos Términos, sin previo aviso.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Propiedad intelectual</h2>
          <p style={pStyle}>
            Todo el contenido de Blanked —incluido, entre otros, el diseño del juego, los gráficos, las animaciones, los sonidos, los textos, el código y nuestra mascota Blink— es de nuestra propiedad intelectual y está protegido por las leyes de derechos de autor, marcas y otras normas aplicables. No puedes copiar, modificar, distribuir, realizar ingeniería inversa ni crear obras derivadas de ninguna parte de la Aplicación sin nuestro permiso expreso por escrito.
          </p>
          <p style={pStyle}>
            Te concedemos una licencia limitada, personal, no exclusiva y no transferible para usar la Aplicación en un dispositivo de tu propiedad o bajo tu control, únicamente para uso personal y no comercial, de acuerdo con estos Términos.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Cancelación de la cuenta</h2>
          <p style={pStyle}>
            Puedes borrar tu cuenta en cualquier momento desde <strong>Ajustes &rarr; Perfil &rarr; Borrar cuenta</strong> dentro de la Aplicación. También puedes pedir la cancelación por correo a{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>.
          </p>
          <p style={pStyle}>
            Podemos suspender o cancelar tu cuenta si incumples estos Términos. Al cancelar:
          </p>
          <ul style={ulStyle}>
            <li>Tu acceso a la Aplicación termina inmediatamente</li>
            <li>Tus datos —gemas, cosméticos, progreso y conexiones con amistades— se eliminarán según se describe en nuestra{' '}
              <Link href="/es/privacy" style={linkStyle}>Política de Privacidad</Link>
            </li>
            <li>Cualquier suscripción activa de Blanked+ seguirá renovándose a través de Apple hasta que la canceles en los ajustes de tu Apple ID: no podemos cancelar en tu nombre las suscripciones gestionadas por Apple</li>
            <li>Las gemas restantes y cualquier ventaja de suscripción no consumida se pierden</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Limitación de responsabilidad</h2>
          <p style={pStyle}>
            Blanked se ofrece &laquo;tal cual&raquo; y &laquo;según disponibilidad&raquo; sin garantías de ningún tipo, expresas o implícitas. En la medida máxima permitida por la ley aplicable, no seremos responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de pérdidas de beneficios, ingresos, datos, uso o reputación derivadas del uso de la Aplicación o relacionadas con él.
          </p>
          <p style={pStyle}>
            <strong>Nada en estos Términos excluye ni limita nuestra responsabilidad por muerte o lesiones personales causadas por nuestra negligencia, por fraude o declaración fraudulenta, ni por cualquier otra responsabilidad que no se pueda excluir o limitar por la ley aplicable.</strong>
          </p>
          <p style={pStyle}>
            Si eres consumidor, estos Términos no afectan a tus derechos legales según las leyes de protección del consumidor de Gibraltar, el Reino Unido o tu país de residencia.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>13. Cambios en estos Términos</h2>
          <p style={pStyle}>
            Podemos actualizar estos Términos de vez en cuando. Cuando hagamos cambios importantes, te avisaremos en la aplicación o por correo antes de que entren en vigor. La fecha de &laquo;Última actualización&raquo; al principio de esta página siempre refleja la versión vigente. Si continúas usando la Aplicación tras la entrada en vigor de los cambios, se entenderá que aceptas los Términos actualizados.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>14. Ley aplicable y jurisdicción</h2>
          <p style={pStyle}>
            Estos Términos se rigen e interpretan conforme a las leyes de Gibraltar, sin perjuicio de sus normas sobre conflicto de leyes. Cualquier disputa que surja de, o en relación con, estos Términos o tu uso de la Aplicación se somete a la jurisdicción exclusiva de los tribunales de Gibraltar.
          </p>
          <p style={pStyle}>
            Si eres consumidor con residencia en la UE, el Reino Unido u otra jurisdicción que te otorgue derechos imperativos locales de protección del consumidor, nada de esta cláusula afecta a tu derecho a iniciar procedimientos en, o a ampararte en las leyes de, el país donde resides.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>15. Divisibilidad</h2>
          <p style={pStyle}>
            Si un tribunal competente declara que alguna disposición de estos Términos es inválida, ilegal o inejecutable, el resto de las disposiciones seguirá en pleno vigor y efecto.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>16. Acuerdo completo</h2>
          <p style={pStyle}>
            Estos Términos, junto con nuestra{' '}
            <Link href="/es/privacy" style={linkStyle}>Política de Privacidad</Link>, constituyen el acuerdo completo entre tú y nosotros respecto a la Aplicación, y sustituyen a cualquier acuerdo anterior.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>17. No renuncia</h2>
          <p style={pStyle}>
            El hecho de que no exijamos un derecho o una disposición de estos Términos no se considerará una renuncia a ese derecho o disposición. Cualquier renuncia deberá constar por escrito y estar firmada por nosotros.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>18. Contacto</h2>
          <p style={pStyle}>
            ¿Dudas sobre estos Términos? Escríbenos:
          </p>
          <p style={pStyle}>
            <strong>Correo</strong>:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
