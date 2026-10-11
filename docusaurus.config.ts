import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// The product is "Deal Desk Studio" everywhere public. The app package and the GitHub org are
// still dealdeskco/dealdesk for historical reasons -- dealdesk.io was unavailable -- but no
// visitor-facing string should say "IO".
const SITE = 'https://dealdesk.studio';
const APP = 'https://app.dealdesk.studio';
// The config is loaded once per locale and Docusaurus sets this before each load. It is how the
// few strings that live here (rather than in i18n/) get translated: the copyright has to keep its
// live year, which a translation file would freeze, and the JSON-LD is not translatable otherwise.
const LOCALE = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'en';
// Two Spanish editions: `es` is Latin American (es-419) and keeps the /es URLs it has always had;
// `es-ES` is Spain's, at /es-ES. They share most wording; where Spain differs it is said here.
const ES_ES = LOCALE === 'es-ES';
const ES = LOCALE === 'es' || ES_ES;
const TAGLINE = ES ? 'Conversaciones que se convierten en negocios.' : 'Conversations in. Deals out.';
const DESCRIPTION = ES_ES
  ? 'Convierta una llamada, una transcripción o unas pocas notas en una propuesta con precios y con su marca que su cliente puede firmar en el momento. Hecho para quienes presupuestan el trabajo.'
  : ES
  ? 'Convierta una llamada, una transcripción o unas pocas notas en una propuesta con precios y con su marca que su cliente puede firmar en el momento. Hecho para quienes cotizan el trabajo.'
  : 'Turn a call, a transcript, or a few notes into a priced, branded proposal your customer can sign on the spot. Built for the people who actually quote the work.';
const OFFER = ES
  ? 'Redactar es gratis. Pague solo cuando envíe un negocio.'
  : 'Free to draft. Pay only when you send a deal.';
const POWERED = ES ? 'Con tecnología de Lucenia' : 'Powered by Lucenia';

const config: Config = {
  title: 'Deal Desk Studio',
  tagline: TAGLINE,
  favicon: 'img/favicon.ico',

  future: {v4: true},

  url: SITE,
  baseUrl: '/',
  organizationName: 'dealdeskco',
  projectName: 'website',
  trailingSlash: false,

  // A broken link on a marketing site is worse than a failed build.
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},

  // Spanish comes in two editions: Latin American neutral (es-419) under /es, and Spain's (es-ES)
  // under /es-ES. Docusaurus writes the hreflang alternates for all three. The theme derives og:locale
  // (en_US / es_419) and og:locale:alternate from htmlLang, so headTags no longer hard-codes it.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'es-ES'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en-US'},
      es: {label: 'Español (Latinoamérica)', htmlLang: 'es-419'},
      'es-ES': {label: 'Español (España)', htmlLang: 'es-ES', path: 'es-ES'},
    },
  },

  headTags: [
    {tagName: 'meta', attributes: {property: 'og:type', content: 'website'}},
    {tagName: 'meta', attributes: {property: 'og:site_name', content: 'Deal Desk Studio'}},
    {tagName: 'meta', attributes: {name: 'twitter:card', content: 'summary_large_image'}},
    {tagName: 'meta', attributes: {name: 'theme-color', content: '#0B1F3A'}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: '/img/favicon.png'}},
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Deal Desk Studio',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: DESCRIPTION,
        url: ES_ES ? `${SITE}/es-ES` : ES ? `${SITE}/es` : SITE,
        inLanguage: ES_ES ? 'es-ES' : ES ? 'es-419' : 'en-US',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: OFFER,
        },
      }),
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          // Not /docs. "Docs" is developer vocabulary; the audience here quotes building work
          // for a living and would reasonably read it as something written for programmers.
          routeBasePath: 'help',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/dealdeskco/website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Deal Desk Studio blog',
          blogDescription: 'Notes on quoting, pricing and getting paid faster.',
          feedOptions: {type: ['rss', 'atom'], xslt: true},
          editUrl: 'https://github.com/dealdeskco/website/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {customCss: './src/css/custom.css'},
        sitemap: {changefreq: 'weekly', priority: 0.5},
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // The developer documentation: a second docs instance with its own sidebar, at /docs/developers
    // so it reads as part of the site rather than as Help (which is written for people who quote
    // work, not people who write code). The content is restructured from the app's
    // developers.html; scripts/check-developer-contract.mjs keeps it in step with the API.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'developers',
        path: 'developers',
        routeBasePath: 'docs/developers',
        sidebarPath: './sidebarsDevelopers.ts',
        editUrl: 'https://github.com/dealdeskco/website/tree/main/',
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {name: 'description', content: DESCRIPTION},
      {
        name: 'keywords',
        content:
          'proposal software, quoting software, e-signature, small business proposals, estimate software, MCP server, AI agent proposals',
      },
    ],
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
    navbar: {
      title: 'Deal Desk',
      logo: {alt: 'Deal Desk Studio', src: 'img/logo.png'},
      items: [
        {to: '/how-it-works', label: 'How it works', position: 'left'},
        {to: '/pricing', label: 'Pricing', position: 'left'},
        {to: '/developers', label: 'Developers', position: 'left'},
        {to: '/help/intro', label: 'Help', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {type: 'localeDropdown', position: 'right'},
        {href: `${APP}/login`, label: 'Sign in', position: 'right'},
        {
          href: `${APP}/login?signup=1`,
          label: 'Start free',
          position: 'right',
          className: 'navbar-cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'How it works', to: '/how-it-works'},
            {label: 'Pricing', to: '/pricing'},
            {label: 'Answering RFPs', to: '/rfp'},
            {label: 'Use with your AI agent', to: '/agents'},
            {label: 'Developers', to: '/developers'},
            {label: 'Sign in', href: `${APP}/login`},
          ],
        },
        {
          title: 'Learn',
          items: [
            {label: 'Help', to: '/help/intro'},
            {label: 'Blog', to: '/blog'},
          ],
        },
        {
          title: 'Company',
          items: [
            {label: 'Contact', to: '/contact'},
            {label: 'Privacy', to: '/legal/privacy'},
            {label: 'Terms', to: '/legal/terms'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Deal Desk Studio · ${POWERED}`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
