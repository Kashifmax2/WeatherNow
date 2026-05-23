import React from "react";
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from "react-icons/wi";

const popularCities = [
  { name: "New York", country: "US" },
  { name: "London", country: "GB" },
  { name: "Tokyo", country: "JP" },
  { name: "Sydney", country: "AU" },
  { name: "Paris", country: "FR" },
  { name: "Dubai", country: "AE" },
];

const floatingIcons = [
  { Icon: WiDaySunny, top: "10%", left: "8%", size: "text-5xl", delay: "0s", opacity: "opacity-20" },
  { Icon: WiRain, top: "20%", right: "10%", size: "text-4xl", delay: "0.5s", opacity: "opacity-15" },
  { Icon: WiSnow, bottom: "25%", left: "5%", size: "text-3xl", delay: "1s", opacity: "opacity-10" },
  { Icon: WiCloudy, bottom: "15%", right: "8%", size: "text-5xl", delay: "1.5s", opacity: "opacity-15" },
  { Icon: WiDaySunny, top: "50%", right: "3%", size: "text-3xl", delay: "0.8s", opacity: "opacity-10" },
];

interface WelcomePlaceholderProps {
  onCitySelect: (city: string, country: string) => void;
}

const WelcomePlaceholder: React.FC<WelcomePlaceholderProps> = ({
  onCitySelect,
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center gap-10 py-8">
      {/* Floating decorative icons */}
      {floatingIcons.map(({ Icon, top, left, right, bottom, size, delay, opacity }, i) => (
        <div
          key={i}
          className={`absolute ${opacity} text-white pointer-events-none ${size} animate-bounce`}
          style={{ top, left, right, bottom, animationDelay: delay, animationDuration: "3s" }}
        >
          <Icon />
        </div>
      ))}

      {/* Main globe icon */}
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-2xl scale-150" />
          <div className="relative w-28 h-28 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
            <WiDaySunny className="text-7xl text-yellow-300/80" />
          </div>
        </div>

        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WeatherNow
          </h2>
          <p className="text-white/50 text-base font-medium max-w-sm">
            Real-time weather at your fingertips. Search any city around the globe.
          </p>
        </div>
      </div>

      {/* Popular cities */}
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          Popular Cities
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {popularCities.map(({ name, country }) => (
            <button
              key={name}
              onClick={() => onCitySelect(name, country)}
              className="
                px-4 py-2
                bg-white/8 hover:bg-white/18
                border border-white/12 hover:border-white/30
                rounded-xl
                text-white/70 hover:text-white
                text-sm font-medium
                transition-all duration-300
                active:scale-95 cursor-pointer
                flex items-center gap-1.5
              "
            >
              <span>{name}</span>
              <span className="text-white/30 text-xs">{country}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          "🌡️ Real-time Temp",
          "💧 Humidity",
          "💨 Wind Speed",
          "🌅 Sunrise & Sunset",
        ].map((feat) => (
          <span
            key={feat}
            className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/40 text-xs font-medium"
          >
            {feat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WelcomePlaceholder;
