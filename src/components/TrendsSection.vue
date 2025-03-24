<template>
  <div class="d-flex mt-14 mb-8">
    <div class="trends__title mr-4">Погода в популярных городах</div>
    <img :src="questIcon" alt="Вопрос" title="Погода в популярных городах" />
  </div>
  <div
    class="d-flex flex-wrap justify-center justify-sm-space-between ga-2 ga-sm-0"
  >
    <div v-for="(item, i) in trendsCity" :key="i">
      <base-card :item="item" :accessKey="accessKey" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import questIcon from "../assets/icons/quest.svg";
import { useWeather } from "../store";
import BaseCard from "./BaseCard.vue";
const weather = useWeather();
const trendsCity = computed(() => weather.getTrendsCity);
const accessKey = computed(() => weather.getAccessKey);
</script>
