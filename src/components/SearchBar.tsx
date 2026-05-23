import React, { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (city: string, country: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim(), country.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* City Input */}
        <div className="relative flex-1">
          <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-lg pointer-events-none" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="
              w-full pl-11 pr-4 py-3.5
              bg-white/10 backdrop-blur-md
              border border-white/20
              rounded-2xl
              text-white placeholder-white/40
              text-base font-medium
              outline-none
              focus:border-white/50 focus:bg-white/15
              transition-all duration-300
            "
          />
        </div>

        {/* Country Input */}
        <div className="relative sm:w-36">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value.toUpperCase())}
            placeholder="Country (US)"
            maxLength={2}
            className="
              w-full px-4 py-3.5
              bg-white/10 backdrop-blur-md
              border border-white/20
              rounded-2xl
              text-white placeholder-white/40
              text-base font-medium uppercase tracking-widest
              outline-none
              focus:border-white/50 focus:bg-white/15
              transition-all duration-300
            "
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="
            flex items-center justify-center gap-2
            px-7 py-3.5
            bg-white/20 hover:bg-white/30
            disabled:opacity-50 disabled:cursor-not-allowed
            border border-white/30 hover:border-white/50
            rounded-2xl
            text-white font-semibold text-base
            transition-all duration-300
            active:scale-95
            cursor-pointer
            whitespace-nowrap
          "
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <FiSearch className="text-lg" />
              <span>Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
