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
    <header class="case-hero band">
      <NuxtLink v-rise class="back rise" to="/#karya">← All work</NuxtLink>
      <p v-rise="70" class="kicker rise">{{ project.eyebrow }}</p>
      <h1 v-rise="120" class="rise">{{ project.title }}</h1>
      <p v-rise="180" class="case-meta rise">
        <span>{{ project.role }}</span>
        <span>{{ project.year }}</span>
      </p>
      <p v-rise="240" class="lead rise">{{ project.summary }}</p>
    </header>

    <div class="sheet">
      <div class="sheet-inner">
        <div v-rise="40" class="rise case-stage">
          <div class="case-float">
            <UiMock class="wide-mock" :kind="project.mock" tall />
          </div>
        </div>
        <div class="case-layout">
          <div class="story">
            <p v-for="(paragraph, index) in project.story" :key="index" v-rise="index * 90" class="rise">
              {{ paragraph }}
            </p>
            <p v-if="project.disclaimer" v-rise="project.story.length * 90" class="disclaimer rise">
              <strong>Disclaimer.</strong> {{ project.disclaimer }}
            </p>
          </div>
          <aside v-rise="80" class="side rise">
            <div>
              <h2>Scope</h2>
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
      <NuxtLink v-rise class="next rise" :to="`/karya/${next.slug}`">
        <span>Next project</span>
        <strong>
          {{ next.title }}
          <span class="next-arrow" aria-hidden="true">→</span>
        </strong>
      </NuxtLink>
    </div>
  </article>
</template>
