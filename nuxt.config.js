export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Raumgleiter',
    titleTemplate: '%s | Raumgleiter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#000000' },
      { rel: 'msapplication-TileColor', content: '#9f00a7' },
    ],
    script: [],
  },
  pwa: {
    meta: {
      title: 'Raumgleiter',
      name: 'Raumgleiter',
      theme_color: '#ffffff',
      ogImage: false,
      ogHost: 'https://raumgleiter.com/',
    },
    manifest: {
      name: 'Raumgleiter',
      short_name: 'Raumgleiter',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'de-CH',
    },
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
    '@/assets/scss/main.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/scss/settings.scss',
      '@/assets/scss/tools.scss',
    ],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: './plugins/mixitup.js', mode: 'client' },
    { src: './plugins/pixi.js', mode: 'client' },
    { src: './plugins/gsap.js', mode: 'client' },
    { src: './plugins/preview.js', mode: 'client' },
    { src: './plugins/craft.js' },
    { src: './plugins/intersection-observer.js', mode: 'client' },
    { src: './plugins/lazysizes.js', mode: 'client' },
    { src: './plugins/canautoplay.js', mode: 'client' },
    { src: './plugins/touch.js', mode: 'client' },
    { src: './plugins/scroll-to-top.js', mode: 'client' },
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
    '@nuxt/http',
    'nuxt-i18n',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Multi-language config
   ** See https://i18n.nuxtjs.org/
   */
  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      { code: 'de', iso: 'de', file: 'de.js' },
      { code: 'en', iso: 'en', file: 'en.js' },
      { code: 'fr', iso: 'fr', file: 'fr.js' },
    ],
    defaultLocale: 'de',
    vueI18n: { fallbackLocale: 'en' },
    vuex: { syncLocale: true },
    langDir: 'lang/',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
    },
    baseUrl: 'https://raumgleiter.com',
    seo: true,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {// Disable a plugin by passing false as value
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
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
      ...process.env.LIVE_PREVIEW !== 'true' && process.env.DEV_MODE !== 'true' ? [
        '/design-inventory', '/en/design-inventory', '/fr/design-inventory',
        '/preview', '/en/preview', '/fr/preview',
        '/preview/pagebuilder', '/en/preview/pagebuilder', '/fr/preview/pagebuilder',
        '/preview/project', '/en/preview/project', '/fr/preview/project',
        '/preview/projectIndex', '/en/preview/projectIndex', '/fr/preview/projectIndex',
        '/preview/solutions', '/en/preview/solutions', '/fr/preview/solutions',
        '/preview/team', '/en/preview/team', '/fr/preview/team',
      ] : [],
    ],
    fallback: '404.html',
  },
  privateRuntimeConfig: {
    http: {
      baseURL: process.env.API_URL || 'https://api.raumgleiter.noo.work',
    },
  },
  publicRuntimeConfig: {
    livePreview: process.env.LIVE_PREVIEW === 'true',
    devMode: process.env.DEV_MODE === 'true',
    http: {
      // browserBaseURL: process.env.API_URL || 'https://api.raumgleiter.noo.work',
      browserBaseURL: process.env.LIVE_PREVIEW === 'true' || process.env.DEV_MODE === 'true'
        ? process.env.API_URL || 'https://api.raumgleiter.noo.work'
        : '',
    },
  },
};
