<template>
    <div class="card d-flex flex-column pa-4 align-center mb-6">
        <div class="card__title mb-2">{{ props.item.name }}</div>
        <div class="card__condition"> {{ translatedCondition }}</div>
        <img class="card__img mt-4 mb-4" :src="`https://yastatic.net/weather/i/icons/funky/dark/${icon}.svg`" alt="icon">
        <div class="card__temp mb-4">{{ currentTemp  }}°</div>
        <div>Влажность: {{  humidity  }}%</div>
    </div>
</template>
<script setup lang="ts">
    import axios from "axios";
    import { ref } from "vue";
    import { translateWeatherCondition } from "../composables/weatherTranslate";
    import type { WeatherData } from '../types/WeatherData';
    interface WeatherProps {
        item: {
            name?: string;
            latitude: number;
            longitude: number;
        };
        accessKey: string;
    }
    const props = defineProps<WeatherProps>()
    let weatherData = ref<WeatherData | null>(null);
    let currentTemp = ref<number>(0);
    let humidity = ref<number>(0);
    let icon = ref<string>("");
    let translatedCondition = ref<string>("")
    const fetch = async function() {
        try {
            const response = await axios.get(
                `https://api.weather.yandex.ru/v2/forecast?lat=${props.item.latitude}&lon=${props.item.longitude}`,{
                    headers:{
                        'X-Yandex-Weather-Key': props.accessKey
                    }
                }
            )
            if (response.data) {
                weatherData.value = response.data
                currentTemp.value = weatherData.value?.fact.temp ?? 0
                humidity.value = weatherData.value?.fact.humidity ?? 0
                icon.value = weatherData.value?.fact.icon ?? "—"
                translatedCondition.value = translateWeatherCondition(weatherData.value?.fact.condition ?? "") ?? "—"
            }
        } catch (error) {
            console.error('Error fetching global coins:', error);
        }
    };
    fetch();
</script>