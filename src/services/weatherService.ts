import axios from "axios";

const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // Free public demo key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  weatherMain: string;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export const fetchWeather = async (
  city: string,
  country?: string
): Promise<WeatherData> => {
  const query = country ? `${city},${country}` : city;

  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: query,
      appid: API_KEY,
      units: "metric",
    },
  });

  const data = response.data;

  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    visibility: data.visibility,
    pressure: data.main.pressure,
    weatherMain: data.weather[0].main,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
  };
};
