// Описываем тип ключей (возможные состояния погоды)
type WeatherCondition = 
    "clear" | "partly-cloudy" | "cloudy" | "overcast" | 
    "light-rain" | "rain" | "heavy-rain" | "showers" | 
    "wet-snow" | "light-snow" | "snow" | "snow-showers" | 
    "hail" | "thunderstorm" | "thunderstorm-with-rain" | "thunderstorm-with-hail";

// Описываем объект-словарь с переводами
const weatherTranslations: Record<WeatherCondition, string> = {
    "clear": "Ясно",
    "partly-cloudy": "Малооблачно",
    "cloudy": "Облачно с прояснениями",
    "overcast": "Пасмурно",
    "light-rain": "Небольшой дождь",
    "rain": "Дождь",
    "heavy-rain": "Сильный дождь",
    "showers": "Ливень",
    "wet-snow": "Дождь со снегом",
    "light-snow": "Небольшой снег",
    "snow": "Снег",
    "snow-showers": "Снегопад",
    "hail": "Град",
    "thunderstorm": "Гроза",
    "thunderstorm-with-rain": "Дождь с грозой",
    "thunderstorm-with-hail": "Гроза с градом"
};

// Функция для перевода состояния погоды
export function translateWeatherCondition(condition: string): string {
    return weatherTranslations[condition as WeatherCondition] || "Неизвестное состояние";
}