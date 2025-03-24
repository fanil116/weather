<template>
  <v-container fluid class="fill-height d-flex">
    <v-row class="fill-height">
      <v-col class="d-flex justify-content-around align-center">
        <v-card elevation="0" color="transparent" class="w-100">
          <v-tabs v-model="tab" align-tabs="start" class="tabs rounded-lg">
            <v-tab
              class="tab tab__first pa-2 pl-4 pr-4"
              selected-class="tab--selected"
              :value="'Home'"
            >
              Главная
            </v-tab>
            <v-tab
              class="tab tab__last pa-2 pl-4 pr-4"
              selected-class="tab--selected"
              :value="'Week'"
            >
              Погода за неделю
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab" class="flex-grow-1">
            <v-tabs-window-item
              v-for="item in items"
              :key="item.tab"
              :value="item.tab"
            >
              <component
                :is="item.content"
                class="fill-height"
                :title="selectedCityName"
              />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
        <app-select class="position-absolute select" @updateCity="updateCity" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useWeather } from "../store";
import type { SelectItems } from "../types/SelectItems";
import AppSelect from "./AppSelect.vue";
import Home from "./HomeView.vue";
import Week from "./WeekView.vue";
const weather = useWeather();
const items = [
  { tab: "Home", content: Home },
  { tab: "Week", content: Week },
];
const allCoordinate = computed(() => {
  return weather.getCoordinate;
});

let tab = ref("Home");
let selectedCityId = ref("kazan");
let selectedCityName = ref("Казань");
const updateCity = (city: SelectItems) => {
  selectedCityId.value = city.id;
  selectedCityName.value = city.title;
};
weather.fetchApi(allCoordinate.value.kazan);
watch(selectedCityId, (newCity) => {
  const cityCoords = allCoordinate.value[newCity];
  if (cityCoords) {
    weather.fetchApi(cityCoords);
  }
});
</script>
