<template>
    <div class="home mt-14">
        <weather-title :currentDate="currentDate" :title="props.title"></weather-title>
        <div class="d-flex mt-12 flex-column  flex-md-row justify-space-between">
            <div class="d-flex home__main align-start">
                <img class="home__main-icon" :src="`https://yastatic.net/weather/i/icons/funky/dark/${icon}.svg`" alt="Icon">
                <div class="home__main-temp ml-11 mr-11">
                    {{ currentTemp }}°
                </div>
                <div class="home__main-info">
                    <div> {{ translatedCondition }}</div>
                    <div class="mt-3 mb-3">Влажность: {{ humidity }} %</div>
                    <div>Ветер: {{ windSpeed }} м/c</div>
                </div>
            </div>
            <div class="d-flex flex-column forecast">
                <div class="d-flex align-center forecast__wrapper justify-space-between" v-for="(item,i) in forecast" :key="i">
                    <div class="mr-8 d-flex flex-column">
                        <p>{{ formatUnixTimeToHHMM(item.hour_ts) }}</p>
                        <p>{{ getTimePeriod(item.hour_ts) }}</p>
                    </div>
                    <div class="mr-8 forecast__temp text-end">{{ item.temp }}°</div>
                    <div class="d-flex align-center mr-8">
                        <img class="forecast__img" :src="`https://yastatic.net/weather/i/icons/funky/dark/${item.icon}.svg`" alt="">
                        <div class="forecast__condition ml-3">{{ translateWeatherCondition(item.condition) }}</div>
                    </div>
                    <div class="mr-8">{{ item.wind_speed }} м/c</div>
                    <div>{{ item.humidity }} %</div>
                </div>
            </div>
        </div>
        <trends-section />
    </div>
</template>
<script setup lang="ts">
    import { computed } from 'vue'
    import { useWeather } from "../store"
    import { convertDate } from "../composables/date";
    import { translateWeatherCondition } from "../composables/weatherTranslate";
    import WeatherTitle from './WeatherTitle.vue'
    import TrendsSection from './TrendsSection.vue'
    const { formatDate, getTimePeriod, formatUnixTimeToHHMM } = convertDate();
    interface WeatherProps {
        title: string;
    }
    const props = defineProps<WeatherProps>()
    const weather = useWeather();
    const weatherData = computed(() => weather.getWeatherData);
    const currentTemp = computed(() => weatherData.value?.fact?.temp ?? "—");
    const currentDate = computed(() => weatherData.value?.now_dt ? formatDate(weatherData.value.now_dt) : "—");
    const translatedCondition = computed(() => weatherData.value?.fact?.condition ? translateWeatherCondition(weatherData.value.fact.condition) : "—");
    const windSpeed = computed(() => weatherData.value?.fact?.wind_speed ?? "—");
    const icon = computed(() => weatherData.value?.fact?.icon ?? "—");
    const humidity = computed(() => weatherData.value?.fact?.humidity ?? "—");
    const forecast = computed(() => {
        if (!weatherData.value?.forecasts?.length) return [];
        return weatherData.value.forecasts[0]?.hours?.filter(item => 
            [0, 3, 6, 9, 12, 15, 19, 21].includes(Number(item.hour))
        ) ?? [];
    });


</script>