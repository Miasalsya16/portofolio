<script setup lang="ts">
import { profile } from '~/data/site'

const year = new Date().getFullYear()
const { show } = useCv()
</script>

<template>
  <footer class="site-footer">
    <p>© {{ year }} {{ profile.name }}</p>
    <p>Nuxt 3 · Vue 3 · {{ profile.location }}</p>
    <p><button type="button" class="text-link" @click="show()">Lihat CV</button></p>
  </footer>
</template>
