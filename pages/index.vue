<script setup lang="ts">
import {
  capabilities,
  education,
  experience,
  filters,
  marquee,
  profile,
  projects,
  skillGroups,
} from '~/data/site'
import type { MockKind } from '~/data/site'

const { show: showCv } = useCv()

useSeoMeta({
  title: 'Mia Salha Syakila — Frontend Developer',
  description: profile.summary,
  ogTitle: 'Mia Salha Syakila — Frontend Developer',
  ogDescription: profile.heroLede,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        email: `mailto:${profile.email}`,
        telephone: profile.phoneTel,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Jakarta',
          addressCountry: 'ID',
        },
        birthPlace: {
          '@type': 'Place',
          name: profile.birthplace,
        },
        sameAs: [profile.linkedin],
      }),
    },
  ],
})

const active = ref<(typeof filters)[number]['id']>('semua')
const visible = computed(() =>
  active.value === 'semua' ? projects : projects.filter((item) => item.category === active.value),
)

function count(id: (typeof filters)[number]['id']) {
  if (id === 'semua') return projects.length
  return projects.filter((item) => item.category === id).length
}

const words = ['marketplace', 'whitelabel', 'dashboard', 'microsite']
const wordIndex = ref(0)
let wordTimer: ReturnType<typeof setInterval> | undefined
const { look } = useLook()
const copies = ref(4)
const toolTrack = ref<HTMLElement | null>(null)
let railObserver: ResizeObserver | undefined

function measureRail() {
  const track = toolTrack.value
  const line = track?.querySelector<HTMLElement>('.tool-line')
  if (!track || !line) return
  const lineWidth = line.getBoundingClientRect().width
  const view = track.parentElement?.clientWidth ?? 0
  if (lineWidth < 8 || view < 8) return
  const needed = Math.max(2, Math.ceil(view / lineWidth) + 1)
  if (copies.value < needed) {
    copies.value = needed
    nextTick(measureRail)
    return
  }
  const lines = track.querySelectorAll<HTMLElement>('.tool-line')
  const shift = lines.length > 1 ? lines[1].offsetLeft - lines[0].offsetLeft : lineWidth
  if (shift > 0) track.style.setProperty('--shift', `${shift}px`)
}

const reel: { kind: MockKind; label: string }[] = [
  { kind: 'market', label: 'Marketplace' },
  { kind: 'label', label: 'Whitelabel' },
  { kind: 'dash', label: 'Dashboard' },
  { kind: 'pos', label: 'BMS & POSPAY' },
]
const reelIndex = ref(0)
let reelTimer: ReturnType<typeof setInterval> | undefined

function playReel() {
  if (reelTimer) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  reelTimer = setInterval(() => {
    reelIndex.value = (reelIndex.value + 1) % reel.length
  }, 3400)
}

function pauseReel() {
  if (!reelTimer) return
  clearInterval(reelTimer)
  reelTimer = undefined
}

const sender = ref('')
const message = ref('')

function send() {
  const subject = encodeURIComponent(`Halo Mia — ${sender.value}`)
  const body = encodeURIComponent(message.value)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
}

watch(look, () => nextTick(measureRail))

onMounted(() => {
  playReel()
  measureRail()
  document.fonts?.ready.then(() => measureRail())
  if (toolTrack.value?.parentElement) {
    railObserver = new ResizeObserver(() => measureRail())
    railObserver.observe(toolTrack.value.parentElement)
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  wordTimer = setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % words.length
  }, 2400)
})

onUnmounted(() => {
  pauseReel()
  railObserver?.disconnect()
  if (wordTimer) clearInterval(wordTimer)
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="blobs" aria-hidden="true">
        <i class="b1" />
        <i class="b2" />
        <i class="b3" />
        <i class="b4" />
      </div>
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">
            <span>Frontend untuk</span>
            <span class="live-slot" aria-hidden="true">
              <span
                v-for="(word, index) in words"
                :key="word"
                class="live-word"
                :class="{ on: index === wordIndex }"
              >{{ word }}</span>
            </span>
            <span class="sr">marketplace, whitelabel, dashboard, dan microsite</span>
            <span class="eyebrow-place">· Jakarta</span>
          </p>
          <h1 class="name">
            <span>Mia Salha</span>
            <span>Syakila</span>
          </h1>
          <p class="lead">{{ profile.heroLede }}</p>
          <div class="hero-actions">
            <a class="btn btn-lime" href="#karya">Lihat karya</a>
            <button type="button" class="btn btn-line" @click="showCv()">Lihat CV</button>
          </div>
          <dl class="stats">
            <div>
              <dt>Pengalaman</dt>
              <dd>3+</dd>
            </div>
            <div>
              <dt>Proyek</dt>
              <dd>13+</dd>
            </div>
            <div>
              <dt>Perusahaan</dt>
              <dd>2</dd>
            </div>
          </dl>
        </div>

        <div class="reel" @mouseenter="pauseReel" @mouseleave="playReel">
          <div class="float-wrap">
            <Transition name="reel" mode="out-in">
              <div :key="reel[reelIndex]!.kind">
                <p class="reel-label">
                  <span>Sedang menampilkan</span>
                  <strong>{{ reel[reelIndex]!.label }}</strong>
                </p>
                <div class="reel-frame">
                  <UiMock :kind="reel[reelIndex]!.kind" tall />
                </div>
              </div>
            </Transition>
          </div>
          <div class="reel-dots">
            <button
              v-for="(item, index) in reel"
              :key="item.kind"
              type="button"
              :aria-pressed="index === reelIndex"
              @click="reelIndex = index"
            >
              <span class="sr">{{ item.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="tool-rail">
      <div ref="toolTrack" class="tool-track">
        <ul v-for="copy in copies" :key="copy" class="tool-line">
          <li v-for="item in marquee" :key="`${copy}-${item}`">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="logo-row">
      <span>Pernah merakit produk di</span>
      <strong>PT Treetan Nusantara Network</strong>
      <strong>Makuta Communication</strong>
    </div>

    <section id="karya" class="sheet">
      <div class="sheet-inner">
        <div v-rise class="section-head rise">
          <div>
            <p class="kicker">Karya</p>
            <h2>Yang paling mewakili.</h2>
          </div>
          <p>Enam cerita dari 13+ proyek. Marketplace, whitelabel, dashboard, microsite, dan satu simulasi belajar.</p>
        </div>

        <div class="filters" role="toolbar" aria-label="Saring karya">
          <button
            v-for="item in filters"
            :key="item.id"
            type="button"
            :aria-pressed="active === item.id"
            @click="active = item.id"
          >
            {{ item.label }}
            <small>{{ count(item.id) }}</small>
          </button>
        </div>

        <div class="work-grid">
          <NuxtLink
            v-for="(project, index) in visible"
            :key="project.slug"
            :to="`/karya/${project.slug}`"
            v-rise="index * 70"
            class="card rise"
            :class="{ 'is-feature': project.featured && active === 'semua' }"
          >
            <UiMock class="card-mock" :kind="project.mock" />
            <div class="card-copy">
              <p class="meta-row">
                <span>0{{ index + 1 }}</span>
                <span>{{ project.eyebrow }}</span>
                <span>{{ project.year }}</span>
              </p>
              <h3>{{ project.title }}</h3>
              <p>{{ project.summary }}</p>
              <ul class="tags">
                <li v-for="tag in project.stack.slice(0, 4)" :key="tag">{{ tag }}</li>
              </ul>
              <span class="more">
                Lihat studi kasus
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section id="tentang" class="band">
      <div class="about-grid">
        <div v-rise class="about-copy rise">
          <p class="kicker">Tentang</p>
          <h2>Setia ke desain. Rapi saat dirawat.</h2>
          <p class="lead">{{ profile.summary }}</p>
          <p>
            Sehari-hari saya mengubah kerangka Figma menjadi komponen Vue, menyambungkan REST API, dan menjaga
            halaman tetap enak dipakai walau datanya banyak. Situs ini sendiri berjalan di Nuxt 3 dan Vue 3.
            Lahir di {{ profile.birthplace }}. Sekarang berdomisili di {{ profile.location }}.
          </p>
        </div>
        <ol v-rise="90" class="caps rise">
          <li v-for="(item, index) in capabilities" :key="item.title">
            <em>0{{ index + 1 }}</em>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section id="jejak" class="sheet">
      <div class="sheet-inner">
        <p class="kicker">Jejak</p>
        <h2>Dua perusahaan, satu keahlian.</h2>
        <ol class="timeline">
          <li v-for="(job, index) in experience" :key="job.company" v-rise="index * 80" class="job rise">
            <div class="when">
              <strong>{{ job.when }}</strong>
              <span>{{ job.role }}</span>
            </div>
            <div>
              <h3>{{ job.company }}</h3>
              <ul class="points">
                <li v-for="point in job.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section id="keahlian" class="band">
      <p class="kicker">Keahlian</p>
      <h2>Alat yang memang saya pakai.</h2>
      <div class="bento">
        <article v-rise class="tile rise">
          <div v-for="group in skillGroups" :key="group.title" class="group">
            <h3>{{ group.title }}</h3>
            <ul class="chips">
              <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
            </ul>
          </div>
        </article>
        <article v-rise="100" class="tile school rise">
          <p class="kicker">Pendidikan</p>
          <p class="degree">{{ education.degree }}</p>
          <p>{{ education.school }}</p>
          <p>{{ education.when }}</p>
          <strong>{{ education.gpa }}</strong>
        </article>
      </div>
      <p class="note">
        Di luar layar produksi Vue: aplikasi Flutter Shiratha Mitra, prototipe kantor virtual, dan simulasi belajar manasik. Simulasi itu alat internal, bukan aplikasi yang dipakai jamaah.
      </p>
    </section>

    <section id="kontak" class="finale">
      <div v-rise class="sheet-inner rise">
        <p class="kicker">Kontak</p>
        <h2 class="display">Mari rakit produk berikutnya.</h2>
        <p class="finale-lead">
          Terbuka untuk peran Frontend Vue dan Nuxt. Domisili di {{ profile.location }}, lahir di {{ profile.birthplace }}. Balasan paling enak lewat email atau WhatsApp.
        </p>
        <a class="mega-mail" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <div class="finale-grid">
          <form @submit.prevent="send">
            <label class="field">
              <span>Nama</span>
              <input v-model="sender" name="nama" autocomplete="name" required placeholder="Nama kamu">
            </label>
            <label class="field">
              <span>Pesan</span>
              <textarea v-model="message" name="pesan" rows="4" required placeholder="Cerita singkat soal produknya" />
            </label>
            <button class="btn btn-ink" type="submit">Kirim lewat email</button>
          </form>
          <div class="direct">
            <a :href="`tel:${profile.phoneTel}`">{{ profile.phoneDisplay }}</a>
            <a :href="profile.whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <button type="button" class="text-link" @click="showCv()">Lihat CV</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
