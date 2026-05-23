import React from "react";
import { WiDaySunny } from "react-icons/wi";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16">
      {/* Spinning weather icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-white/60 animate-spin" />
        <WiDaySunny className="absolute inset-0 m-auto text-4xl text-white/70 animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-white/80 text-lg font-semibold tracking-wide">
          Fetching weather...
        </p>
        <p className="text-white/40 text-sm">This won't take long</p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-white/50 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
