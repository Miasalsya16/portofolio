<script setup lang="ts">
import { nav, profile } from '~/data/site'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const clock = ref(profile.location)
let timer: ReturnType<typeof setInterval> | undefined

function onScroll() {
  scrolled.value = window.scrollY > 6
}

function onResize() {
  if (window.innerWidth > 860) open.value = false
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

function tick() {
  const time = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  }).format(new Date())
  clock.value = `${profile.location} · ${time} WIB`
}

async function go(href: string) {
  open.value = false
  const id = href.split('#')[1]
  if (route.path !== '/') {
    await navigateTo(href)
    return
  }
  await nextTick()
  document.getElementById(id || '')?.scrollIntoView({ behavior: 'smooth' })
}

watch(() => route.fullPath, () => {
  open.value = false
})

onMounted(() => {
  onScroll()
  tick()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
  timer = window.setInterval(tick, 20000)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div>
    <header class="site-header" :class="{ 'is-on': scrolled || open }">
      <NuxtLink to="/" class="brand" aria-label="Mia Salha Syakila, beranda">
        <span class="mark">M</span>
        <span>
          <strong>{{ profile.name.split(' ').slice(0, 2).join(' ') }}</strong>
          <small>{{ profile.role }}</small>
        </span>
      </NuxtLink>

      <nav class="nav-desktop" aria-label="Utama">
        <a v-for="item in nav" :key="item.href" :href="item.href" @click.prevent="go(item.href)">
          {{ item.label }}
        </a>
      </nav>

      <div class="header-actions">
        <ClientOnly>
          <span class="clock">{{ clock }}</span>
          <template #fallback>
            <span class="clock">{{ profile.location }}</span>
          </template>
        </ClientOnly>
        <a class="btn btn-lime nav-cta" href="/#kontak" @click.prevent="go('/#kontak')">Halo</a>
        <button
          type="button"
          class="burger"
          :class="{ 'is-open': open }"
          :aria-expanded="open"
          aria-controls="menu"
          @click="open = !open"
        >
          <span class="bar" />
          <span class="bar" />
          <span class="bar" />
          <span class="sr">Menu</span>
        </button>
      </div>
    </header>

    <nav v-show="open" id="menu" class="nav-panel" aria-label="Menu">
      <a v-for="item in nav" :key="item.href" :href="item.href" @click.prevent="go(item.href)">
        {{ item.label }}
      </a>
    </nav>
  </div>
</template>
