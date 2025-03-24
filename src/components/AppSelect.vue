<template>
  <div>
    <v-select
      v-model="selected"
      label="Select"
      :items="selectItems"
      single-line
      item-title="title"
      item-value="id"
      variant="plain"
      flat
      rounded="lg"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          class="select__items"
          :class="{ 'select--selected-item': item.raw.id === selected }"
        >
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";

import type { SelectItems } from "../types/SelectItems";
let selected = ref<string>("kazan");
const selectItems: SelectItems[] = [
  { title: "Казань", id: "kazan" },
  { title: "Краснодар", id: "krasnodar" },
  { title: "Уфа", id: "ufa" },
  { title: "Новосибирск", id: "novosibirsk" },
  { title: "Красноярск", id: "krasnoyarsk" },
  { title: "Москва", id: "moscow" },
];
const emit = defineEmits(["updateCity"]);
watch(selected, () => {
  let item = selectItems.find((item) => item.id === selected.value);
  emit("updateCity", item);
});
</script>
