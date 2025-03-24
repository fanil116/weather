interface TzInfo {
  name: string; // Часовой пояс (например, "Europe/Moscow")
  abbr: string; // Аббревиатура (например, "MSK")
  dst: boolean; // Летнее время (true/false)
  offset: number; // Смещение от UTC в секундах (например, 10800 = UTC+3)
}

interface Info {
  n: boolean;
  url: string; // Ссылка на страницу погоды
  lat: number; // Широта
  lon: number; // Долгота
  tzinfo: TzInfo; // Информация о часовом поясе
  def_pressure_mm: number; // Давление в мм рт. ст.
  def_pressure_pa: number; // Давление в Паскалях
  zoom: number; // Уровень масштаба карты
  nr: boolean;
  ns: boolean;
  nsr: boolean;
  p: boolean;
  f: boolean;
  _h: boolean;
}

interface Fact {
  daytime: string; // "d" - день, "n" - ночь
  obs_time: number; // Время наблюдения (Unix timestamp)
  season: string; // Времена года
  source: string; // Источник данных (например, "station")
  uptime: number; // Время обновления (Unix timestamp)
  cloudness: number; // Облачность (0 - ясно, 1 - полностью облачно)
  condition: string; // Погодное состояние (например, "cloudy", "clear")
  feels_like: number; // Ощущаемая температура
  humidity: number; // Влажность в %
  icon: string; // Код иконки погоды (например, "bkn_n")
  is_thunder: boolean; // Есть ли гроза
  polar: boolean; // Полярный день/ночь
  prec_prob: number; // Вероятность осадков в %
  prec_strength: number; // Интенсивность осадков (0 - нет осадков)
  prec_type: number; // Тип осадков (0 - нет, 1 - дождь, 2 - снег и т.д.)
  pressure_mm: number; // Давление в мм рт. ст.
  pressure_pa: number; // Давление в Па
  temp: number; // Температура в градусах
  uv_index: number; // УФ-индекс
  wind_angle: number; // Угол ветра (в градусах)
  wind_dir: string; // Направление ветра (например, "w" - западный)
  wind_gust: number; // Порывы ветра (м/с)
  wind_speed: number; // Скорость ветра (м/с)
}
interface Biomet {
  index: number;
  condition: string; // Например, "magnetic-field_0"
}

interface WeatherPart {
  daytime: string; // "d" для дня, "n" для ночи
  _source: string; // Источник данных
  biomet: Biomet; // Индекс биометеорологической ситуации
  cloudness: number; // Облачность (например, 0.75)
  condition: string; // Состояние погоды (например, "light-snow")
  fresh_snow_mm: number; // Новая снежная осадка в мм
  humidity: number; // Влажность (в процентах)
  icon: string; // Иконка состояния погоды
  polar: boolean; // Полярность (не используется в контексте, но присутствует)
  prec_mm: number; // Осадки в мм
  prec_period: number; // Период осадков в секундах
  prec_prob: number; // Вероятность осадков в процентах
  prec_strength: number; // Сила осадков
  prec_type: number; // Тип осадков (0 - дождь, 1 - снег, и так далее)
  pressure_mm: number; // Давление в мм рт. ст.
  pressure_pa: number; // Давление в Паскалях
  temp_avg: number; // Средняя температура
  temp_max: number; // Максимальная температура
  temp_min: number; // Минимальная температура
  feels_like: number; // Ощущаемая температура
  uv_index: number; // Уровень ультрафиолетового излучения
  wind_angle: number; // Направление ветра (в градусах)
  wind_dir: string; // Направление ветра (например, "w" - запад)
  wind_gust: number; // Порывы ветра в м/с
  wind_speed: number; // Скорость ветра в м/с
}

interface HourlyWeather {
  hour: string; // Час в формате строки (например, "0", "1" и т.д.)
  hour_ts: number; // Временная метка для часа
  cloudness: number; // Облачность
  condition: string; // Состояние погоды
  feels_like: number; // Ощущаемая температура
  humidity: number; // Влажность
  icon: string; // Иконка состояния погоды
  prec_mm: number; // Осадки в мм
  prec_period: number; // Период осадков в секундах
  prec_prob: number; // Вероятность осадков
  prec_strength: number; // Сила осадков
  prec_type: number; // Тип осадков
  pressure_mm: number; // Давление в мм рт. ст.
  pressure_pa: number; // Давление в Паскалях
  temp: number; // Температура
  uv_index: number; // Уровень ультрафиолетового излучения
  wind_angle: number; // Направление ветра
  wind_dir: string; // Направление ветра
  wind_gust: number; // Порывы ветра
  wind_speed: number; // Скорость ветра
}

interface Forecast {
  date: string; // Дата (например, "2025-03-20")
  date_ts: number; // Временная метка для даты
  week: number; // Номер недели (например, 12)
  sunrise: string; // Время восхода солнца
  sunset: string; // Время заката
  rise_begin: string; // Начало восхода
  set_end: string; // Конец заката
  moon_code: number; // Код фазы луны
  moon_text: string; // Текстовое описание фазы луны
  parts: {
    day: WeatherPart;
    day_short: WeatherPart;
    evening: WeatherPart;
    morning: WeatherPart;
    night: WeatherPart;
    night_short: WeatherPart;
  };
  hours: HourlyWeather[];
  biomet: Biomet; // Биометеорологическая информация
}
export interface WeatherData {
  now: number;
  now_dt: string;
  info: Info;
  fact: Fact;
  forecasts: Forecast[];
}
