export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  devServer: { port: 4321, host: '127.0.0.1' },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'Mia Salha Syakila — Frontend Developer',
      meta: [
        {
          name: 'description',
          content:
            'Portofolio Mia Salha Syakila, Frontend Developer Vue.js dan Nuxt.js di Jakarta. Lahir di Garut. Marketplace, whitelabel, dashboard, dan microsite — UI dari Figma, data dari REST API.',
        },
        { name: 'theme-color', content: '#f7f4ef' },
        { property: 'og:title', content: 'Mia Salha Syakila — Frontend Developer' },
        {
          property: 'og:description',
          content:
            'Marketplace, whitelabel, dashboard, dan microsite — dirakit dengan Vue.js dan Nuxt.js.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [{
        innerHTML: "document.documentElement.classList.add('js');try{if(localStorage.getItem('mia-look')==='ai')document.documentElement.classList.add('look-ai')}catch(e){}",
        tagPosition: 'head',
      }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
