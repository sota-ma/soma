const pkg = require('./package')
require('dotenv').config()

const name = process.env.BASIC_NAME
const pass = process.env.BASIC_PASS

let functionsUrl = ''
if (process.env.NODE_DEPLOY === 'development') {
  functionsUrl = process.env.FIREBASE_TEST_FUNCTIONS_URL
}
if (process.env.NODE_DEPLOY === 'production') {
  functionsUrl = process.env.FIREBASE_FUNCTIONS_URL
}

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: 'icon-16x16.png' },
      { rel: 'icon', sizes: '32x32', type: 'image/png', href: 'icon-32x32.png' },
      { rel: 'icon', sizes: '48x48', type: 'image/png', href: 'icon-48x48.png' },
      { rel: 'icon', sizes: '72x72', type: 'image/png', href: 'icon-72x72.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/contentful.js',
    '~/plugins/firebase.js',
    '~/plugins/consola.js',
    '~/plugins/prism.js',
    { src: '~plugins/ga.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-basic-auth-module',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: false,
    langPrefix: 'language-',
    typographer: true,
    quotes: '""'
  },
  basic: {
    name: name,
    pass: pass
  },
  /*
  ** Axios module config.contentfuluration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: functionsUrl
  },
  /*
  ** Build config().contentfuluration
  */
  buildDir: 'functions/nuxt',
  build: {
    /*
    ** You can extend webpack config().contentful here
    */
    publicPath: '/assets/',
    extractCSS: true,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|functions\/nuxt)/
        })
      }
    }
  },
  server: {
    port: 8000
  }
}
