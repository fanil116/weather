<template>
  <div class="mt-14 week">
    <weather-title
      :currentDate="currentDate"
      :title="props.title"
    ></weather-title>
    <div class="d-flex flex-wrap mt-12">
      <div
        v-for="(item, i) in forecast"
        :key="i"
        class="week__card d-flex flex-column align-center mr-5"
      >
        <div class="mb-2 text-capitalize">
          {{ formatDayOfWeek(item.date_ts) }}
        </div>
        <img
          class="week__img mb-2"
          :src="`https://yastatic.net/weather/i/icons/funky/dark/${item.parts.day.icon}.svg`"
          alt="icon"
        />
        <div>{{ item.parts.day.temp_avg }}°</div>
      </div>
    </div>
    <trends-section />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { convertDate } from "../composables/date";
import { useWeather } from "../store";
import TrendsSection from "./TrendsSection.vue";
import WeatherTitle from "./WeatherTitle.vue";
const props = defineProps(["title"]);
const weather = useWeather();
const { formatDate, formatDayOfWeek } = convertDate();
const weatherData = computed(() => weather.getWeatherData);
const currentDate = computed(() =>
  weatherData.value?.now_dt ? formatDate(weatherData.value.now_dt) : "—",
);
const forecast = computed(() => {
  return weatherData.value?.forecasts ?? [];
});
</script>
