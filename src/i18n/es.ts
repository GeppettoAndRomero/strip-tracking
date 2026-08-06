import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario que se usa habitualmente para este
// tipo de herramientas en español, no traducción literal. Sin lenguaje exagerado
// (fácil/rápido/perfecto, etc.); la privacidad se explica de forma estructural, no
// como promesa (BRAND-OPERATING-MODEL / I18N-SEO-GUIDELINE).

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Eliminar parámetros de rastreo de una URL — sin subir nada | runlocally',
    description:
      'Elimina UTM, fbclid, gclid y otros parámetros de rastreo de una o varias URLs, directamente en tu navegador. Las URLs pegadas nunca se envían a ningún sitio. Código abierto, funciona sin conexión.',
    ogTitle: 'Eliminar parámetros de rastreo de una URL',
    ogDescription:
      'Elimina UTM, fbclid, gclid y otros parámetros de rastreo de una URL, en tu navegador. No se sube nada.',
  },

  hero: {
    h1: 'Eliminar parámetros de rastreo de una URL',
    tagline:
      'Pega una o varias URLs y elimina UTM, fbclid, gclid y otros parámetros de rastreo — en tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Quitar los parámetros de rastreo de una URL sin tocar lo demás',
    paras: [
      'Los enlaces que se comparten desde apps sociales, boletines por correo o campañas publicitarias suelen ser más largos que la página a la que apuntan. Lo que va después del ? suele ser información de rastreo — utm_source, fbclid, gclid y otras muchas — añadida por el sitio desde el que copiaste el enlace, no por la propia página de destino.',
      'Esta herramienta analiza cada URL usando solo las API URL y URLSearchParams integradas en el navegador, elimina cualquier parámetro que esté en su lista de rastreo, y deja todo lo demás — incluidos los parámetros que la página de destino realmente necesita — sin tocar.',
    ],
  },

  privacy: {
    h2: 'Por qué las URLs que pegas se quedan en tu dispositivo',
    lead: 'Este tipo de herramienta tiene un punto irónico: muchos servicios de "quitar el rastreo de una URL" son en realidad un servidor que recibe la URL que pegas, lo cual ya es un registro en sí mismo. Aquí la privacidad es estructural, no una promesa, porque ese servidor no existe:',
    points: [
      'El análisis y la limpieza ocurren enteramente en tu navegador, usando la API URL integrada.',
      'La página se sirve como archivos estáticos y no realiza ninguna petición que lleve las URLs que pegas — no hay a dónde enviarlas, y por tanto nada que registrar.',
      'El código es abierto y cualquiera puede revisarlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de red de tu navegador mientras pegas una URL: ninguna petición la lleva consigo.',
    sourceLinkText: 'Ver el código fuente.',
  },

  howto: {
    h2: 'Cómo usarlo',
    steps: [
      {
        h3: 'Pega tus URLs',
        p: 'Pega una URL, o varias — una por línea — en el cuadro de texto. Haz clic en "Cargar ejemplo" para verlo funcionar con datos de muestra.',
      },
      {
        h3: 'Revisa qué cambió',
        p: 'Cada línea muestra la URL limpia, además de los parámetros de rastreo que se eliminaron, tachados, para que veas exactamente qué se quitó y qué se mantuvo.',
      },
      {
        h3: 'Copia el resultado',
        p: 'Copia una URL limpia individualmente, o usa "Copiar todas las URLs limpias" para copiarlas todas a la vez, una por línea.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Las URLs que pego se suben a algún sitio?',
      a: 'No. El análisis y la limpieza ocurren enteramente en tu navegador, usando las API URL y URLSearchParams integradas en él. No hay ningún componente de servidor, así que las URLs que pegas no tienen forma de salir de tu dispositivo, ni siquiera para quedar registradas.',
    },
    {
      q: '¿Qué parámetros de rastreo elimina?',
      a: 'Los habituales de Google/Google Ads (utm_*, gclid, gclsrc, dclid, wbraid, gbraid), Meta/Facebook (fbclid), Instagram (igshid, igsh), Microsoft Advertising (msclkid), Mailchimp (mc_eid, mc_cid), TikTok (ttclid), Twitter/X (twclid), Pinterest (epik), Yandex (yclid), HubSpot (_hsenc, _hsmi), Marketo (mkt_tok), Vero (vero_id), Adobe/Omniture (s_cid), las etiquetas de cliente/sesión de Google Analytics (_ga, _gl), parámetros de referencia genéricos (ref, ref_src, ref_url), y el rastreo de enlaces compartidos de YouTube/Spotify (si), entre otros. La lista completa y editable está en el código fuente (src/utils/trackingParams.ts).',
    },
    {
      q: '¿Puede eliminar parámetros que la página sí necesita, como un ID de producto?',
      a: 'No — solo se eliminan los parámetros que están en la lista de rastreo. Un parámetro como id, page o color que el sitio de destino necesita para funcionar se mantiene exactamente igual.',
    },
    {
      q: '¿Qué pasa si una línea no es una URL válida?',
      a: 'Esa línea muestra un mensaje de error en lugar de un resultado limpio; el resto de líneas del lote se sigue procesando con normalidad.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Después de la primera visita queda guardada en caché, así que funciona sin conexión a internet. También puedes instalarla en tu pantalla de inicio.',
    },
    {
      q: '¿Hay un límite de cuántas URLs puedo pegar a la vez?',
      a: 'No hay un límite fijo — es un análisis de texto plano, así que incluso varios cientos de líneas se procesan al instante. El límite práctico es cuánto puedas pegar cómodamente en un cuadro de texto.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que funcionan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },

  related: {
    h2: 'Herramientas relacionadas',
    blogLinkText: 'Leer las notas técnicas',
  },
};
