export default {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
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
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [],
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
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios'
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {},

    /*
    ** Add routes
    */
    router: {
        extendRoutes(routes, resolve) {
            routes.push({
                name: 'Virtual Real Estate',
                path: '/virtual-real-estate',
                component: resolve(__dirname, 'pages/index.vue')
            });
            routes.push({
                name: 'Virtuelle Vermarktung',
                path: '/virtuelle-vermarktung',
                component: resolve(__dirname, 'pages/index.vue')
            });
            routes.push({
                name: 'Virtueller Wettbewerb',
                path: '/virtueller-wettbewerb',
                component: resolve(__dirname, 'pages/index.vue')
            });
        }
    }
}
