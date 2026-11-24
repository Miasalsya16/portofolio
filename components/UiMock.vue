<script setup lang="ts">
import type { MockKind } from '~/data/site'

const props = defineProps<{
  kind: MockKind
  tall?: boolean
}>()

const captions: Record<MockKind, string> = {
  market: 'katalog / produk',
  label: 'whitelabel / beranda',
  dash: 'dasbor / travel',
  pos: 'pos / microsite',
  ads: 'makuta / iklan',
  learn: 'belajar / manasik',
}

const shots: Partial<Record<MockKind, {
  src: string
  alt: string
  caption: string
  video?: boolean
  poster?: string
  phone?: { src: string; poster: string; alt: string }
}>> = {
  market: {
    src: '/shots/shiratha.mp4',
    poster: '/shots/shiratha.jpg',
    alt: 'Marketplace Shiratha di layar laptop.',
    caption: 'Shiratha · desktop & ponsel',
    video: true,
    phone: {
      src: '/shots/shiratha-phone.mp4',
      poster: '/shots/shiratha-phone.jpg',
      alt: 'Marketplace Shiratha di layar ponsel, digulir dari beranda.',
    },
  },
  label: {
    src: '/shots/minala.png',
    alt: 'Salah satu whitelabel, tampilan Minala Tours di laptop dan ponsel.',
    caption: 'Salah satu whitelabel',
  },
  dash: {
    src: '/shots/dashboard.mp4',
    poster: '/shots/dashboard.jpg',
    alt: 'Contoh dasbor admin Treetan: ringkasan, pesanan, dan pelacakan booking.',
    caption: 'Salah satu contoh · Dasbor',
    video: true,
  },
  pos: {
    src: '/shots/pospay.png',
    alt: 'Microsite BMS dan POSPAY.',
    caption: 'BMS & POSPAY',
  },
}

const tick = ref(0)
const root = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | undefined
let observer: IntersectionObserver | undefined

const face = computed(() => (tick.value % 2 === 0 ? 'user' : 'admin'))
const shot = computed(() => shots[props.kind])

onMounted(() => {
  if (props.kind === 'ads' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(() => {
      tick.value += 1
    }, 2200)
  }

  const videos = root.value ? [...root.value.querySelectorAll('video')] : []
  if (!videos.length) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const nudge = () => {
    videos.forEach((video) => {
      if (reduced) {
        video.pause()
        return
      }
      const box = video.getBoundingClientRect()
      const visible = Math.max(0, Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0))
      if (box.height > 0 && visible / box.height > 0.2) video.play().catch(() => {})
      else video.pause()
    })
  }
  if (reduced) {
    nudge()
    return
  }
  observer = new IntersectionObserver(() => nudge(), { threshold: [0, 0.2, 0.6] })
  videos.forEach((video) => observer?.observe(video))
  requestAnimationFrame(nudge)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="mock" :class="[`mock-${kind}`, { 'is-tall': tall, 'is-shot': !!shot }]" :aria-hidden="shot ? undefined : true">
    <figure v-if="shot" class="shot" :class="{ 'is-video': shot.video, 'is-pair': !!shot.phone }">
      <div class="shot-stage">
        <video
          v-if="shot.video"
          class="shot-desk"
          :src="shot.src"
          :poster="shot.poster"
          muted
          loop
          playsinline
          autoplay
          preload="metadata"
          :aria-label="shot.alt"
        />
        <img v-else :src="shot.src" :alt="shot.alt" />
        <video
          v-if="shot.phone"
          class="shot-phone"
          :src="shot.phone.src"
          :poster="shot.phone.poster"
          muted
          loop
          playsinline
          autoplay
          preload="metadata"
          :aria-label="shot.phone.alt"
        />
      </div>
      <figcaption>{{ shot.caption }}</figcaption>
    </figure>

    <div v-if="!shot" class="chrome">
      <i /><i /><i />
      <em>{{ captions[kind] }}</em>
    </div>

    <div v-if="kind === 'market' && !shot" class="screen market">
      <div class="top">
        <strong class="word">Shiratha</strong>
        <span>Umroh</span>
        <span>Haji</span>
        <span>Wisata</span>
        <b class="cart">2</b>
      </div>
      <div class="search">Cari paket umroh, haji, wisata</div>
      <div class="products">
        <article>
          <div class="ph a" />
          <b>Reguler</b>
          <small>9 hari · Makkah</small>
        </article>
        <article>
          <div class="ph b" />
          <b>Plus</b>
          <small>12 hari · Madinah</small>
        </article>
        <article>
          <div class="ph c" />
          <b>Keluarga</b>
          <small>Privat · Hotel</small>
        </article>
      </div>
    </div>

    <div v-else-if="kind === 'learn'" class="screen learn">
      <p class="learn-kicker">Hidayah Hajj Adventure</p>
      <h3>Simulasi belajar</h3>
      <ol>
        <li><b>Manasik</b><span>Peta Makkah: umroh, ifrad, qiran, tamattu</span></li>
        <li><b>Dari Jakarta</b><span>Kantor SHIRATHA, bandara, lalu miqat</span></li>
      </ol>
      <p class="learn-note">Bukan aplikasi jamaah. Bukan pengganti ibadah.</p>
    </div>

    <div v-else-if="kind === 'ads'" class="screen ads">
      <div class="ads-top">
        <strong>Makuta</strong>
        <span :class="{ on: face === 'user' }">User</span>
        <span :class="{ on: face === 'admin' }">Admin</span>
      </div>
      <div v-if="face === 'user'" class="posters">
        <article class="poster one"><b>Estusae</b><small>Iklan properti</small></article>
        <article class="poster two"><b>Grand Taman Sari</b><small>Iklan properti</small></article>
      </div>
      <div v-else class="rows admin-rows">
        <p><span>Estusae</span><em class="ok">Tayang</em></p>
        <p><span>Grand Taman Sari</span><em class="wait">Review</em></p>
        <p><span>Report mingguan</span><em>Data</em></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mock {
  border-radius: 18px;
  overflow: hidden;
  background: #121714;
  border: 1px solid rgba(20, 32, 24, 0.08);
  box-shadow: 0 16px 40px rgba(16, 20, 16, 0.12);
  pointer-events: none;
  font-family: var(--sans);
  color: #1c261f;
}

.chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: #121714;
}

.chrome i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3c463f;
}

.chrome i:nth-child(1) { background: #ff6b4a; }
.chrome i:nth-child(2) { background: #dff25a; }
.chrome i:nth-child(3) { background: #8fd6c4; }

.chrome em {
  margin-left: 6px;
  font-style: normal;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: #b7c2ba;
}

.screen { min-height: 228px; }
.is-tall .screen { min-height: 320px; }

.shot {
  margin: 0;
  background: #070707;
  position: relative;
}

.shot img,
.shot video {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  background: #070707;
}

.shot img { aspect-ratio: auto; object-fit: contain; background: transparent; }

.mock.is-shot:not(:has(.is-video)) {
  background: transparent;
  border: 0;
  box-shadow: none;
}

.shot:not(.is-video) { background: transparent; }

.shot:not(.is-video) figcaption {
  position: static;
  display: inline-flex;
  width: fit-content;
  margin: 12px 0 0;
  background: #fffcf8;
  border: 1px solid rgba(28, 25, 22, 0.12);
}
.shot video { aspect-ratio: 880 / 504; }

.shot figcaption {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 246, 234, 0.94);
  color: #17211b;
  font-size: 12px;
  letter-spacing: 0.01em;
}

.mock:has(.is-video) {
  background: transparent;
  border: 0;
  box-shadow: none;
  overflow: visible;
}

.shot.is-video {
  background: transparent;
}

.shot-stage {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  min-width: 0;
  max-width: 100%;
}

.card-mock,
.mock,
.shot { min-width: 0; max-width: 100%; }

.shot.is-video video {
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(16, 20, 16, 0.12);
}

.shot.is-pair .shot-desk {
  flex: 1 1 260px;
  min-width: min(100%, 240px);
  max-width: 100%;
  width: auto;
}

.shot.is-pair .shot-phone {
  flex: 0 0 auto;
  width: clamp(86px, 24%, 150px);
  aspect-ratio: 320 / 650;
  border-radius: 22px;
  object-fit: cover;
}

.shot.is-video figcaption {
  position: static;
  display: inline-flex;
  width: auto;
  margin: 12px 0 0;
  padding: 6px 12px;
  border-radius: 999px;
  background: white;
  color: #17211b;
  border: 1px solid rgba(20, 32, 24, 0.1);
  letter-spacing: 0.01em;
}

.market { background: #f6f3ec; padding: 12px; display: grid; gap: 10px; align-content: start; }
.top { display: flex; align-items: center; gap: 10px; font-size: 11px; color: #5c675f; }
.word { font-family: var(--serif); font-size: 18px; letter-spacing: -0.03em; color: #143028; margin-right: auto; }
.cart {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #143028;
  color: #dff25a;
  font-size: 11px;
}
.search {
  background: white;
  border-radius: 999px;
  padding: 8px 12px;
  color: #7b857e;
  font-size: 11px;
}
.products, .pair, .posters { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.pair, .posters { grid-template-columns: 1fr 1fr; }
.products article, .pair article {
  background: white;
  border-radius: 12px;
  padding: 8px;
  display: grid;
  gap: 2px;
}
.products b, .pair b, .poster b { font-size: 12px; }
.products small, .pair small, .poster small { color: #6d7871; font-size: 10px; }
.ph { height: 54px; border-radius: 8px; margin-bottom: 6px; }
.is-tall .ph { height: 78px; }
.ph.a { background: linear-gradient(160deg, #143028, #3e8f72); }
.ph.b { background: linear-gradient(160deg, #c4a574, #efe6d4); }
.ph.c { background: linear-gradient(160deg, #1d3557, #7eb8c9); }

.dash { display: grid; grid-template-columns: 46px 1fr; background: #f3f6f4; min-height: 250px; }
aside { background: #13261e; display: grid; align-content: start; gap: 10px; padding: 12px 0; justify-items: center; }
aside i { width: 16px; height: 16px; border-radius: 5px; background: rgba(223, 242, 90, 0.85); }
aside i:nth-child(n + 2) { background: rgba(255, 255, 255, 0.16); }
.dash-main { padding: 10px; display: grid; gap: 8px; align-content: start; }
.dash-top, .ads-top, .rows p { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.dash-top strong { font-size: 13px; }
.dash-top span, .kpis small { color: #667068; font-size: 10px; }
.kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.kpis article { background: white; border-radius: 10px; padding: 8px; }
.kpis b { display: block; font-family: var(--serif); font-size: 20px; letter-spacing: -0.04em; }
.bars { height: 64px; display: flex; align-items: flex-end; gap: 6px; padding: 0 2px; }
.is-tall .bars { height: 92px; }
.bars i {
  flex: 1;
  height: var(--h);
  border-radius: 5px 5px 2px 2px;
  background: linear-gradient(#1f6b52, #b7f2d8);
  transform-origin: bottom;
  animation: risebar 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.bars i:nth-child(2) { animation-delay: 0.05s; }
.bars i:nth-child(3) { animation-delay: 0.1s; }
.bars i:nth-child(4) { animation-delay: 0.15s; }
.bars i:nth-child(5) { animation-delay: 0.2s; }
.bars i:nth-child(6) { animation-delay: 0.25s; }
.rows { display: grid; gap: 4px; font-size: 11px; }
.rows p { margin: 0; background: white; border-radius: 8px; padding: 6px 8px; }
.rows em { font-style: normal; font-size: 10px; border-radius: 99px; padding: 2px 6px; background: #eceae4; }
.rows em.ok { background: #d9f5df; color: #146233; }
.rows em.wait { background: #fff0d6; color: #8a4b08; }

.ads { background: #f7f4ef; padding: 12px; display: grid; gap: 10px; align-content: start; }
.ads-top strong { font-family: var(--serif); font-size: 18px; margin-right: auto; }
.ads-top span { font-size: 11px; padding: 3px 8px; border-radius: 99px; background: white; }
.ads-top span.on { background: #15210b; color: #dff25a; }
.poster { min-height: 96px; border-radius: 14px; padding: 12px; display: grid; align-content: end; color: white; }
.is-tall .poster { min-height: 140px; }
.poster.one { background: linear-gradient(160deg, #1d3557, #4a6fa5); }
.poster.two { background: linear-gradient(160deg, #6b3f2a, #d4a276); }
.poster small { color: rgba(255, 255, 255, 0.8); }
.admin-rows em { background: #eceae4; }

.learn {
  background: #fbf9f6;
  padding: 16px;
  display: grid;
  gap: 10px;
  align-content: start;
}

.learn-kicker {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6d655c;
}

.learn h3 {
  margin: 0;
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 520;
  letter-spacing: -0.03em;
}

.learn ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.learn li {
  display: grid;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f3efe8;
}

.learn b { font-size: 13px; }
.learn span { font-size: 12px; color: #6d655c; }

.learn-note {
  margin: 0;
  font-size: 12px;
  color: #8d4b36;
}

@keyframes risebar {
  from { transform: scaleY(0.2); }
  to { transform: scaleY(1); }
}

</style>
