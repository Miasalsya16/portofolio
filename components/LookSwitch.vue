<script setup lang="ts">
const { look, toggle } = useLook()
</script>

<template>
  <button type="button" class="look-switch" :aria-pressed="look === 'ai'" @click="toggle">
    {{ look === 'ai' ? 'Tampilan saya' : 'Tampilan AI' }}
  </button>
</template>

<style scoped>
.look-switch {
  position: fixed;
  z-index: 70;
  right: 16px;
  bottom: 16px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(28, 25, 22, 0.2);
  background: #fffcf8;
  color: #1c1916;
  box-shadow: 0 10px 28px rgba(28, 25, 22, 0.16);
  font-size: 13px;
  font-weight: 600;
}

.look-switch:hover { background: #1c1916; color: #f7f4ef; }
</style>
