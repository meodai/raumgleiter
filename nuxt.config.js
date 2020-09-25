export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Raumgleiter",
    titleTemplate: "%s - Raumgleiter",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Disable loading indicator
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/settings.scss',
    '@/assets/scss/tools.scss',
    '@/assets/scss/reset.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/scss/settings.scss',
      '@/assets/scss/tools.scss',
    ]
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: "./plugins/mixitup.js",
      mode: "client"
    },
    {
      src: "./plugins/pixi.js",
      mode: "client"
    },
    {
      src: "./plugins/gsap.js",
      mode: "client"
    },
    {
      src: "./plugins/preview.js",
      mode: "client"
    },
    {
      src: "./plugins/craft.js",
    },
    {
      src: "./plugins/intersection-observer.js",
      mode: "client"
    },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxt/http",
    "nuxt-i18n",
    "@nuxtjs/style-resources",
  ],
  /*
   ** Multi-language config
   ** See https://i18n.nuxtjs.org/
   */
  i18n: {
    strategy: "prefix_except_default",
    locales: ["de", "fr", "en"],
    defaultLocale: "de",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        de: {
          sector: 'Sektor',
          offer: 'Angebot',
        },
        en: {
          sector: 'Sektor',
          offer: 'Angebot',
        },
        fr: {
          sector: 'Sektor',
          offer: 'Angebot',
        },
      }
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        },
      },
    },
  },
  /*
   ** Add routes
   */
  router: {},
  /*
   ** Static site generation config
   */
  generate: {
    exclude: [
      ...process.env.LIVE_PREVIEW !== 'true' ? [
        '/preview', '/en/preview', '/fr/preview',
        '/preview/pagebuilder', '/en/preview/pagebuilder', '/fr/preview/pagebuilder',
        '/preview/project', '/en/preview/project', '/fr/preview/project',
        '/preview/projectIndex', '/en/preview/projectIndex', '/fr/preview/projectIndex',
        '/preview/solutions', '/en/preview/solutions', '/fr/preview/solutions',
        '/preview/team', '/en/preview/team', '/fr/preview/team',
      ] : [],
    ],
  },
  privateRuntimeConfig: {
    http: {
      baseURL: process.env.API_URL || "https://api.raumgleiter.noo.work",
    },
  },
  publicRuntimeConfig: {
    livePreview: process.env.LIVE_PREVIEW === 'true',
    http: {
      // browserBaseURL: process.env.LIVE_PREVIEW === 'true' ? process.env.API_URL || "https://api.raumgleiter.noo.work" : ''
      browserBaseURL: process.env.API_URL || "https://api.raumgleiter.noo.work",
    }
  },
};
