export function useCv() {
  const open = useState('cv-open', () => false)
  const active = useState('cv-active', () => 'v1')

  function show(id = 'v1') {
    active.value = id
    open.value = true
  }

  function close() {
    open.value = false
  }

  return { open, active, show, close }
}
