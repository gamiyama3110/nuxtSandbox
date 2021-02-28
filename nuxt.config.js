import webpack from 'webpack';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxtSandbox',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-build/
  // 色々定義できるってのが分かった。
  build: {
    plugins: [
      // グローバルな形でプラグインが使えるようになる
      // lodashの宣言をここでしかやってないんだけど、どうやってインポートしてるん？
      // nuxtに含まれてるので明示的にinstallしなくても動くっぽい。webpackも同様。
      // package.jsonに明示的にしておく。
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  }
}

