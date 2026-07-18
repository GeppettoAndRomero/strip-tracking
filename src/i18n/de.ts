import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf Basis der
// Begriffe, die im deutschsprachigen Raum für solche Tools üblich sind. Keine
// Übertreibungen (einfach/schnell/perfekt usw.); Privacy wird strukturell begründet,
// nicht als Versprechen formuliert (BRAND-OPERATING-MODEL / I18N-SEO-GUIDELINE).

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Tracking-Parameter aus einer URL entfernen — kein Upload | runlocally',
    description:
      'Entferne UTM-, fbclid-, gclid- und andere Tracking-Parameter aus einer oder mehreren URLs, direkt in deinem Browser. Eingefügte URLs werden nirgendwohin gesendet. Open Source, funktioniert offline.',
    ogTitle: 'Tracking-Parameter aus einer URL entfernen',
    ogDescription:
      'Entferne UTM-, fbclid-, gclid- und andere Tracking-Parameter aus einer URL, in deinem Browser. Es wird nichts hochgeladen.',
  },

  hero: {
    h1: 'Tracking-Parameter aus einer URL entfernen',
    tagline:
      'Füge eine oder mehrere URLs ein und entferne UTM-, fbclid-, gclid- und andere Tracking-Parameter — direkt im Browser. Es wird nichts hochgeladen.',
  },

  intro: {
    h2: 'Tracking-Parameter sauber aus einer URL entfernen',
    paras: [
      'Links, die über soziale Apps, Newsletter oder Werbekampagnen geteilt werden, sind oft länger als die Seite, auf die sie verweisen. Der Teil nach dem ? ist meist Tracking-Daten — utm_source, fbclid, gclid und Dutzende weitere —, die von der Quelle des Links hinzugefügt wurden, nicht von der Zielseite selbst.',
      'Dieses Tool analysiert jede URL nur mit den im Browser eingebauten URL- und URLSearchParams-APIs, entfernt jeden Parameter auf seiner Tracking-Liste und lässt alles andere — einschließlich Query-Parametern, die die Zielseite tatsächlich braucht — unangetastet.',
    ],
  },

  privacy: {
    h2: 'Warum die eingefügten URLs auf deinem Gerät bleiben',
    lead: 'Bei dieser Art Tool gibt es eine gewisse Ironie: Viele „Tracking aus URL entfernen“-Dienste sind selbst ein Server, der die eingefügte URL empfängt — was bereits ein Log-Eintrag ist. Privacy ist hier strukturell, kein Versprechen, weil es diesen Server nicht gibt:',
    points: [
      'Analyse und Bereinigung laufen vollständig im Browser, mit der eingebauten URL-API.',
      'Die Seite wird als statische Dateien ausgeliefert und sendet keine Anfrage mit den eingefügten URLs — es gibt keine Stelle, an die sie geschickt und damit protokolliert werden könnten.',
      'Der Quellcode ist offen und für jeden einsehbar (MIT).',
      'Es funktioniert offline — was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wer es selbst prüfen möchte: Öffne beim Einfügen einer URL das Netzwerk-Panel deines Browsers — keine Anfrage trägt sie mit sich.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'URLs einfügen',
        p: 'Füge eine URL oder mehrere — eine pro Zeile — in das Textfeld ein. Klicke auf „Beispiel laden“, um es an einem Beispiel zu sehen.',
      },
      {
        h3: 'Änderungen prüfen',
        p: 'Jede Zeile zeigt die bereinigte URL sowie die tatsächlich entfernten Tracking-Parameter, durchgestrichen dargestellt — so siehst du genau, was entfernt wurde und was geblieben ist.',
      },
      {
        h3: 'Ergebnis kopieren',
        p: 'Kopiere eine einzelne bereinigte URL, oder nutze „Alle bereinigten URLs kopieren“, um alle auf einmal zu kopieren, eine pro Zeile.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Werden die eingefügten URLs irgendwohin hochgeladen?',
      a: 'Nein. Analyse und Bereinigung laufen vollständig im Browser, mit den eingebauten URL- und URLSearchParams-APIs. Es gibt keine serverseitige Komponente, daher haben die eingefügten URLs keinen Weg vom Gerät weg — nicht einmal, um sie zu protokollieren.',
    },
    {
      q: 'Welche Tracking-Parameter werden entfernt?',
      a: 'Gängige Parameter von Google/Google Ads (utm_*, gclid, gclsrc, dclid, wbraid, gbraid), Meta/Facebook (fbclid), Instagram (igshid, igsh), Microsoft Advertising (msclkid), Mailchimp (mc_eid, mc_cid), TikTok (ttclid), Twitter/X (twclid), Pinterest (epik), Yandex (yclid), HubSpot (_hsenc, _hsmi), Marketo (mkt_tok), Vero (vero_id), Adobe/Omniture (s_cid), Google-Analytics-Client-/Session-Tags (_ga, _gl), generische Referral-Parameter (ref, ref_src, ref_url) sowie YouTube-/Spotify-Share-Tracking (si), unter anderem. Die vollständige, editierbare Liste steht im Quellcode (src/utils/trackingParams.ts).',
    },
    {
      q: 'Werden auch Parameter entfernt, die eine Seite tatsächlich braucht, etwa eine Produkt-ID?',
      a: 'Nein — es wird nur entfernt, was auf der Tracking-Liste steht. Ein Parameter wie id, page oder color, den die Zielseite zum Funktionieren braucht, bleibt genau so erhalten, wie er war.',
    },
    {
      q: 'Was passiert, wenn eine Zeile keine gültige URL ist?',
      a: 'Diese Zeile zeigt statt eines bereinigten Ergebnisses eine Fehlermeldung; alle anderen Zeilen im Stapel werden trotzdem normal verarbeitet.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch wird sie zwischengespeichert und funktioniert danach ohne Netzwerkverbindung. Du kannst sie auch auf deinem Startbildschirm installieren.',
    },
    {
      q: 'Gibt es ein Limit, wie viele URLs ich auf einmal einfügen kann?',
      a: 'Kein festes Limit — es ist reine Textanalyse, sodass selbst einige hundert Zeilen sofort verarbeitet werden. Die praktische Grenze ist, wie viel du bequem in ein Textfeld einfügen kannst.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },
};
