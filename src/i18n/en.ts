import type { ToolContent } from './types';

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Strip Tracking Parameters from a URL — No Upload | runlocally',
    description:
      'Remove UTM, fbclid, gclid and other tracking parameters from one or more URLs, directly in your browser. Pasted URLs are never sent anywhere. Open source, works offline.',
    ogTitle: 'Strip Tracking Parameters from a URL',
    ogDescription:
      'Remove UTM, fbclid, gclid and other tracking parameters from a URL, in your browser. Nothing is uploaded.',
  },

  hero: {
    h1: 'Strip Tracking Parameters from a URL',
    tagline:
      'Paste one or more URLs and remove UTM, fbclid, gclid and other tracking parameters — in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Clean tracking parameters out of a URL',
    paras: [
      'Links shared from social apps, email newsletters and ad campaigns are usually longer than the page they point to. The part after the ? is often tracking data — utm_source, fbclid, gclid and dozens of others — added by whatever you copied the link from, not by the destination page.',
      'This tool parses each URL with the browser’s own URL and URLSearchParams APIs, removes any parameter on its tracking list, and leaves everything else — including query parameters the destination page actually needs — untouched.',
    ],
  },

  privacy: {
    h2: 'Why the URLs you paste stay on your device',
    lead: 'This kind of tool is a little ironic: many "remove tracking from a URL" services are themselves a server that receives the URL you paste — which is a log entry. Privacy here is structural, not a promise, because that server does not exist:',
    points: [
      'Parsing and cleaning happen entirely in your browser, with the built-in URL API.',
      'The page is served as static files and makes no request carrying the URLs you paste — there is nothing to send them to, and so nothing to log them.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: "If you want to check for yourself, open your browser's Network panel while pasting a URL — no request carries it.",
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Paste your URLs',
        p: 'Paste one URL, or several — one per line — into the text box. Click "Load example" to see it work on a sample.',
      },
      {
        h3: 'Review what changed',
        p: 'Each line shows the cleaned URL, plus the tracking parameters that were removed, struck through, so you can see exactly what left and what stayed.',
      },
      {
        h3: 'Copy the result',
        p: 'Copy a single cleaned URL, or use "Copy all" to copy every cleaned URL at once, one per line.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Are the URLs I paste uploaded anywhere?',
      a: 'No. Parsing and cleaning happen entirely in your browser, using the URL and URLSearchParams APIs built into it. There is no server component, so the URLs you paste have no path off your device — not even to log them.',
    },
    {
      q: 'Which tracking parameters does it remove?',
      a: 'Common ones from Google/Google Ads (utm_*, gclid, gclsrc, dclid, wbraid, gbraid), Meta/Facebook (fbclid), Instagram (igshid, igsh), Microsoft Advertising (msclkid), Mailchimp (mc_eid, mc_cid), TikTok (ttclid), Twitter/X (twclid), Pinterest (epik), Yandex (yclid), HubSpot (_hsenc, _hsmi), Marketo (mkt_tok), Vero (vero_id), Adobe/Omniture (s_cid), Google Analytics client/session tags (_ga, _gl), generic referral params (ref, ref_src, ref_url), and YouTube/Spotify share tracking (si), among others. The full, editable list is in the source (src/utils/trackingParams.ts).',
    },
    {
      q: 'Will it remove parameters a page actually needs, like a product ID?',
      a: 'No — only parameters on the tracking list are removed. A parameter like id, page, or color that the destination site needs to function is left exactly as it was.',
    },
    {
      q: "What happens if a line isn't a valid URL?",
      a: 'That line shows an error message instead of a cleaned result; every other line in the batch is still processed normally.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so it works without a network connection. You can also install it to your home screen.',
    },
    {
      q: 'Is there a limit to how many URLs I can paste at once?',
      a: "No fixed limit — it's plain text parsing, so even a few hundred lines process instantly. The practical ceiling is how much you can comfortably paste into a text box.",
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      "Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer's.",
    securityText: 'Security',
  },

  related: {
    h2: 'Related tools',
    blogLinkText: 'Read the technical notes',
  },
};
