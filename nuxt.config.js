import axios from 'axios';

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: "./plugins/mixitup.js",
      mode: "client"
    }, {
      src: "./plugins/pixi.js",
      mode: "client"
    }, {
      src: "./plugins/gsap.js",
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
    ["./modules/cache-data", { baseUrl: "https://cms.raumgleiter.noo.work" }]
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "nuxt-i18n"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // Setting CMS_URL takes precedence, otherwise it falls back to the local cache or the production cms
    baseURL:
      process.env.CMS_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://cms.raumgleiter.noo.work")
  },
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
      messages: {}
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** Add routes
   */
  router: {},
  /*
   ** Static site generation config
   */
  generate: {
    // routes () {
    //     return axios.get((process.env.CMS_URL || 'https://cms.raumgleiter.noo.work') + '/projects.json').then((res) => {
    //         return res.data.data
    //         .filter(entry => entry.url !== false)
    //         .map((entry) => {
    //             return {
    //                 route: entry.url,
    //                 payload: entry,
    //             };
    //         });
    //     });
    // },
  }
};
