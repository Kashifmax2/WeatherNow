import React, { useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import WelcomePlaceholder from "../components/WelcomePlaceholder";
import { fetchWeather, WeatherData } from "../services/weatherService";

type WeatherCondition =
  | "clear"
  | "clouds"
  | "rain"
  | "drizzle"
  | "thunderstorm"
  | "snow"
  | "mist"
  | "default";

const getBackgroundClass = (condition?: WeatherCondition): string => {
  switch (condition) {
    case "clear":
      return "bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700";
    case "clouds":
      return "bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700";
    case "rain":
    case "drizzle":
      return "bg-gradient-to-br from-blue-900 via-slate-800 to-blue-800";
    case "thunderstorm":
      return "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800";
    case "snow":
      return "bg-gradient-to-br from-blue-200 via-slate-300 to-blue-300";
    case "mist":
      return "bg-gradient-to-br from-gray-500 via-slate-500 to-gray-600";
    default:
      return "bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900";
  }
};

const getWeatherCondition = (main?: string): WeatherCondition => {
  if (!main) return "default";
  const key = main.toLowerCase() as WeatherCondition;
  const validConditions: WeatherCondition[] = [
    "clear", "clouds", "rain", "drizzle", "thunderstorm", "snow", "mist",
  ];
  return validConditions.includes(key) ? key : "default";
};

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<{ city: string; country: string } | null>(null);

  const condition = getWeatherCondition(weather?.weatherMain);
  const bgClass = getBackgroundClass(condition);

  const handleSearch = useCallback(async (city: string, country: string) => {
    setIsLoading(true);
    setError(null);
    setLastSearch({ city, country });

    try {
      const data = await fetchWeather(city, country);
      setWeather(data);
    } catch (err: unknown) {
      setWeather(null);
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { status?: number } }).response?.status === 404
      ) {
        setError(
          `City "${city}" not found. Please check the spelling and try again.`
        );
      } else if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { status?: number } }).response?.status === 401
      ) {
        setError("Invalid API key. Please check your configuration.");
      } else {
        setError("Something went wrong. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRetry = () => {
    if (lastSearch) {
      handleSearch(lastSearch.city, lastSearch.country);
    }
  };

  const handleCitySelect = (city: string, country: string) => {
    handleSearch(city, country);
  };

  return (
    <div
      className={`
        min-h-screen w-full
        ${bgClass}
        transition-all duration-1000 ease-in-out
        relative overflow-hidden
      `}
    >
      {/* Background animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 -right-32 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-72 h-72 bg-white/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="w-full max-w-2xl mb-8 sm:mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🌤️</span>
            <h1 className="text-2xl font-bold text-white/90 tracking-wide">
              WeatherNow
            </h1>
          </div>
          <p className="text-white/40 text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-8 sm:mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Content area */}
        <div className="w-full max-w-2xl flex-1 flex flex-col items-center">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {!isLoading && !error && weather && (
            <WeatherCard weather={weather} />
          )}

          {!isLoading && !error && !weather && (
            <WelcomePlaceholder onCitySelect={handleCitySelect} />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-white/20 text-xs font-medium tracking-wide">
            Powered by{" "}
            <span className="text-white/35">OpenWeather API</span>
            {" · "}
            <span className="text-white/35">WeatherNow © {new Date().getFullYear()}</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WeatherPage;
