<script setup lang="ts">
import { cvs } from '~/data/site'

const { open, active, close } = useCv()
const closeButton = ref<HTMLButtonElement | null>(null)
let lockedScroll = 0

const current = computed(() => cvs.find((item) => item.id === active.value) ?? cvs[0]!)

function lockScroll() {
  lockedScroll = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${lockedScroll}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
}

function unlockScroll() {
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  window.scrollTo(0, lockedScroll)
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(open, async (isOpen) => {
  if (!import.meta.client) return
  if (isOpen) {
    lockScroll()
    window.addEventListener('keydown', onKey)
    await nextTick()
    closeButton.value?.focus()
    return
  }
  window.removeEventListener('keydown', onKey)
  unlockScroll()
})

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('keydown', onKey)
  if (document.body.style.position === 'fixed') unlockScroll()
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="cv-layer" @click.self="close">
      <div
        class="cv-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-title"
      >
        <header class="cv-bar">
          <div>
            <p id="cv-title">Curriculum vitae</p>
            <div class="cv-tabs" role="tablist" aria-label="Versi CV">
              <button
                v-for="item in cvs"
                :key="item.id"
                type="button"
                role="tab"
                :aria-selected="active === item.id"
                @click="active = item.id"
              >
                {{ item.label }}
                <small>{{ item.note }}</small>
              </button>
            </div>
          </div>
          <div class="cv-actions">
            <a class="cv-download" :href="current.file" download>Unduh</a>
            <button ref="closeButton" type="button" class="cv-close" @click="close">Tutup</button>
          </div>
        </header>
        <iframe :key="current.file" class="cv-frame" :src="current.file" :title="`CV ${current.label}`" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cv-layer {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(28, 25, 22, 0.55);
}

.cv-dialog {
  width: min(980px, 100%);
  height: min(88vh, 920px);
  display: flex;
  flex-direction: column;
  background: #fbf9f6;
  color: #1c1916;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(28, 25, 22, 0.28);
}

.cv-bar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 16px 12px;
  border-bottom: 1px solid rgba(28, 25, 22, 0.08);
}

.cv-bar p {
  margin: 0 0 10px;
  font-size: 13px;
  color: #5f574f;
  font-weight: 560;
}

.cv-tabs { display: flex; flex-wrap: wrap; gap: 8px; }

.cv-tabs button {
  display: grid;
  justify-items: start;
  gap: 1px;
  border: 1px solid rgba(28, 25, 22, 0.14);
  background: transparent;
  color: inherit;
  border-radius: 4px;
  padding: 8px 12px;
  text-align: left;
}

.cv-tabs button[aria-selected="true"] {
  background: #1c1916;
  border-color: #1c1916;
  color: #f3efe8;
}

.cv-tabs small {
  font-size: 11px;
  letter-spacing: 0.01em;
  color: #6d655c;
}

.cv-tabs button[aria-selected="true"] small { color: #cbbba6; }

.cv-actions { display: flex; gap: 8px; align-items: center; }

.cv-download,
.cv-close {
  min-height: 38px;
  padding: 0 14px;
  border-radius: 4px;
  border: 1px solid rgba(28, 25, 22, 0.16);
  background: transparent;
  color: inherit;
  text-decoration: none;
  font-weight: 560;
  display: inline-flex;
  align-items: center;
}

.cv-close { background: #1c1916; color: #f3efe8; border-color: #1c1916; }

.cv-frame {
  flex: 1;
  width: 100%;
  border: 0;
  background: white;
}

@media (max-width: 640px) {
  .cv-layer { padding: 0; }
  .cv-dialog { width: 100%; height: 100%; border-radius: 0; }
  .cv-bar { flex-direction: column; }
}
</style>
