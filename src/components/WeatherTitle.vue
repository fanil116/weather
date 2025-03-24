<template>
  <div class="weather-title__title">Погода в городе {{ props.title }}</div>
  <div class="weather-title__subtitle mt-3">
    {{ props.currentDate }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["title", "currentDate"]);
</script>
