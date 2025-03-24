import axios from "axios";
import { defineStore } from "pinia";

import type { Coordinates } from "../types/Coordinate";
import type { WeatherData } from "../types/WeatherData";
interface WeatherState {
  coordinate: Record<string, Coordinates>;
  accessKey: string;
  weatherData: WeatherData | null;
  trendsCity: Coordinates[];
}

export const useWeather = defineStore("weather", {
  state: (): WeatherState => ({
    coordinate: {
      kazan: {
        latitude: 55.7887,
        longitude: 49.1221,
      },
      krasnodar: {
        latitude: 45.0448,
        longitude: 38.976,
      },
      ufa: {
        latitude: 54.733334,
        longitude: 56.0,
      },
      novosibirsk: {
        latitude: 55.018803,
        longitude: 82.933952,
      },
      krasnoyarsk: {
        latitude: 56.0184,
        longitude: 92.8672,
      },
      moscow: {
        latitude: 55.751244,
        longitude: 37.618423,
      },
    },
    accessKey: "ef930777-ea9a-4236-a72c-4e6a51359a0f",
    weatherData: null,
    trendsCity: [
      {
        name: "Москва",
        latitude: 55.751244,
        longitude: 37.618423,
      },
      {
        name: "Новосибирск",
        latitude: 55.018803,
        longitude: 82.933952,
      },
      {
        name: "Краснодар",
        latitude: 45.0448,
        longitude: 38.976,
      },
      {
        name: "Красноярск",
        latitude: 56.0184,
        longitude: 92.8672,
      },
      {
        name: "Уфа",
        latitude: 54.733334,
        longitude: 56.0,
      },
    ],
  }),

  getters: {
    getCoordinate: (state) => state.coordinate,
    getWeatherData: (state) => state.weatherData,
    getTrendsCity: (state) => state.trendsCity,
    getAccessKey: (state) => state.accessKey,
  },

  actions: {
    async fetchApi({ latitude, longitude }: Coordinates) {
      try {
        const response = await axios.get(
          `https://api.weather.yandex.ru/v2/forecast?lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              "X-Yandex-Weather-Key": this.accessKey,
            },
          },
        );
        if (response.data) {
          this.weatherData = response.data;
        }
      } catch (error) {
        console.error("Error fetching global coins:", error);
      }
    },
  },
});
