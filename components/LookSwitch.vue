<script setup lang="ts">
const { look, toggle } = useLook()
</script>

<template>
  <button type="button" class="look-switch" :aria-pressed="look === 'ai'" @click="toggle">
    Ganti tampilan
  </button>
</template>

<style scoped>
.look-switch {
  flex: 0 0 auto;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(28, 25, 22, 0.22);
  background: #fffcf8;
  color: #1c1916;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
}

.look-switch:hover { background: #1c1916; color: #f7f4ef; }

@media (max-width: 640px) {
  .look-switch { font-size: 12px; padding: 0 10px; min-height: 32px; }
}
</style>
