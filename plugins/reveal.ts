export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('rise', {
    mounted(el, binding) {
      const node = el as HTMLElement
      const delay = Number(binding.value || 0)
      if (delay) node.style.transitionDelay = `${delay}ms`
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        node.classList.add('in')
        return
      }
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add('in')
          observer.disconnect()
        }
      }, { threshold: 0.16 })
      observer.observe(node)
    },
    getSSRProps(binding) {
      const delay = Number(binding.value || 0)
      return delay ? { style: { transitionDelay: `${delay}ms` } } : {}
    },
  })
})
