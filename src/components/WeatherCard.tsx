import React from "react";
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { FiEye, FiThermometer } from "react-icons/fi";
import { WeatherData } from "../services/weatherService";

interface WeatherCardProps {
  weather: WeatherData;
}

const formatTime = (unix: number, timezoneOffset: number): string => {
  const date = new Date((unix + timezoneOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getWeatherGradient = (main: string): string => {
  switch (main.toLowerCase()) {
    case "clear":
      return "from-sky-400/30 via-blue-500/20 to-indigo-600/30";
    case "clouds":
      return "from-slate-400/30 via-gray-500/20 to-slate-600/30";
    case "rain":
    case "drizzle":
      return "from-blue-900/40 via-slate-700/30 to-blue-800/40";
    case "thunderstorm":
      return "from-gray-900/50 via-purple-900/30 to-gray-800/40";
    case "snow":
      return "from-blue-100/30 via-slate-300/20 to-blue-200/30";
    case "mist":
    case "fog":
    case "haze":
      return "from-gray-500/30 via-slate-400/20 to-gray-600/30";
    default:
      return "from-blue-500/30 via-indigo-500/20 to-purple-600/30";
  }
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div
    className="
    flex flex-col items-center justify-center gap-1.5
    bg-white/8 hover:bg-white/15
    border border-white/10 hover:border-white/25
    rounded-2xl p-4
    transition-all duration-300
    group cursor-default
  "
  >
    <span className="text-3xl text-white/60 group-hover:text-white/90 group-hover:scale-110 transition-all duration-300">
      {icon}
    </span>
    <span className="text-white font-bold text-base">{value}</span>
    <span className="text-white/40 text-xs uppercase tracking-wider font-medium">
      {label}
    </span>
  </div>
);

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const {
    city,
    country,
    temperature,
    feelsLike,
    description,
    icon,
    humidity,
    windSpeed,
    visibility,
    pressure,
    weatherMain,
    sunrise,
    sunset,
    timezone,
  } = weather;

  const gradientClass = getWeatherGradient(weatherMain);
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div
      className={`
        w-full max-w-2xl mx-auto
        bg-gradient-to-br ${gradientClass}
        backdrop-blur-xl
        border border-white/15
        rounded-3xl
        overflow-hidden
        shadow-2xl shadow-black/30
        hover:shadow-black/50 hover:-translate-y-1
        transition-all duration-500
        group
      `}
    >
      {/* Inner glass overlay */}
      <div className="relative p-6 sm:p-8">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header: City + Icon */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          {/* Left: location + temp */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            {/* City name */}
            <div className="flex items-center gap-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {city}
              </h2>
              {/* Country badge */}
              <span className="mt-1 px-2.5 py-0.5 bg-white/15 border border-white/20 rounded-full text-white/70 text-sm font-semibold">
                {country}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/60 text-base capitalize font-medium">
              {description}
            </p>

            {/* Temperature */}
            <div className="flex items-end gap-1 mt-2">
              <span className="text-7xl sm:text-8xl font-extrabold text-white leading-none tracking-tighter">
                {temperature}
              </span>
              <span className="text-4xl font-light text-white/70 mb-3">°C</span>
            </div>

            {/* Feels like */}
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <FiThermometer className="text-base" />
              <span>Feels like {feelsLike}°C</span>
            </div>
          </div>

          {/* Right: Weather icon */}
          <div className="flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
            <img
              src={iconUrl}
              alt={description}
              className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl filter"
              style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))" }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Stats Grid */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={<WiHumidity />}
            label="Humidity"
            value={`${humidity}%`}
          />
          <StatCard
            icon={<WiStrongWind />}
            label="Wind"
            value={`${windSpeed} m/s`}
          />
          <StatCard
            icon={<FiEye className="mt-1.5" />}
            label="Visibility"
            value={`${(visibility / 1000).toFixed(1)} km`}
          />
          <StatCard
            icon={<WiBarometer />}
            label="Pressure"
            value={`${pressure} hPa`}
          />
        </div>

        {/* Divider */}
        <div className="relative my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Sunrise / Sunset */}
        <div className="relative flex justify-center gap-8 sm:gap-16">
          <div className="flex items-center gap-3">
            <WiSunrise className="text-4xl text-amber-300/80" />
            <div className="flex flex-col">
              <span className="text-white/40 text-xs uppercase tracking-widest font-medium">
                Sunrise
              </span>
              <span className="text-white font-bold text-lg">
                {formatTime(sunrise, timezone)}
              </span>
            </div>
          </div>

          {/* Timeline bar */}
          <div className="hidden sm:flex flex-1 items-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-amber-400/50 via-orange-300/30 to-amber-400/50 rounded-full" />
          </div>

          <div className="flex items-center gap-3">
            <WiSunset className="text-4xl text-orange-400/80" />
            <div className="flex flex-col">
              <span className="text-white/40 text-xs uppercase tracking-widest font-medium">
                Sunset
              </span>
              <span className="text-white font-bold text-lg">
                {formatTime(sunset, timezone)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
