export type Look = 'now' | 'ai'

export function useLook() {
  const look = useState<Look>('look', () => 'now')

  function apply(next: Look) {
    look.value = next
    if (!import.meta.client) return
    document.documentElement.classList.toggle('look-ai', next === 'ai')
    localStorage.setItem('mia-look', next)
  }

  function toggle() {
    apply(look.value === 'ai' ? 'now' : 'ai')
  }

  onMounted(() => {
    const saved = localStorage.getItem('mia-look')
    if (saved === 'ai' || saved === 'now') apply(saved)
  })

  return { look, toggle }
}
