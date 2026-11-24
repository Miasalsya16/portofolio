<script setup lang="ts">
import { getNextProject, getProject } from '~/data/site'

definePageMeta({
  key: (route) => route.fullPath,
})

const route = useRoute()
const project = getProject(String(route.params.slug))

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Karya tidak ditemukan',
    fatal: true,
  })
}

const next = getNextProject(project.slug)

useSeoMeta({
  title: `${project.title} — Mia Salha Syakila`,
  description: project.summary,
  ogTitle: `${project.title} — Mia Salha Syakila`,
  ogDescription: project.summary,
})
</script>

<template>
  <article>
    <header v-rise class="case-hero band rise">
      <NuxtLink class="back" to="/#karya">← Semua karya</NuxtLink>
      <p class="kicker">{{ project.eyebrow }}</p>
      <h1>{{ project.title }}</h1>
      <p class="case-meta">
        <span>{{ project.role }}</span>
        <span>{{ project.year }}</span>
      </p>
      <p class="lead">{{ project.summary }}</p>
    </header>

    <div v-rise="80" class="sheet rise">
      <div class="sheet-inner">
        <UiMock class="wide-mock" :kind="project.mock" tall />
        <div class="case-layout">
          <div class="story">
            <p v-for="(paragraph, index) in project.story" :key="index">{{ paragraph }}</p>
            <p v-if="project.disclaimer" class="disclaimer">
              <strong>Disclaimer.</strong> {{ project.disclaimer }}
            </p>
          </div>
          <aside class="side">
            <div>
              <h2>Cakupan</h2>
              <ul class="points">
                <li v-for="item in project.highlights" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div>
              <h2>Stack</h2>
              <ul class="tags">
                <li v-for="tag in project.stack" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <div class="band">
      <NuxtLink class="next" :to="`/karya/${next.slug}`">
        <span>Karya berikutnya</span>
        <strong>{{ next.title }}</strong>
      </NuxtLink>
    </div>
  </article>
</template>
