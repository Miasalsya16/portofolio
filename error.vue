<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="miss">
    <p class="kicker">404</p>
    <h1>Halaman ini tidak ada di peta.</h1>
    <p>Tautan yang kamu buka tidak ketemu. Karya yang ada semuanya di beranda.</p>
    <button type="button" class="btn btn-lime" @click="goHome">Kembali ke beranda</button>
  </div>
</template>
