import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { CountryCode } from "@/hooks/use-countries";
import Image from "next/image";

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  countries: CountryCode[];
  isLoading?: boolean;
  disabled?: boolean;
}

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  value,
  onChange,
  countries,
  isLoading = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find((c) => c.code === value);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery) ||
      country.iso.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (countryCode: string) => {
    onChange(countryCode);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
        disabled={disabled || isLoading}
        className="h-[44px] px-3 border rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-between gap-2 hover:bg-gray-50 transition-colors"
      >
        {isLoading ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : selectedCountry ? (
          <div className="flex items-center gap-2">
            <Image
              src={selectedCountry.flag}
              alt={selectedCountry.name}
              width={20}
              height={20}
              className="object-cover"
            />
            <span className="text-sm font-medium">{selectedCountry.code}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500">Select</span>
        )}
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-[280px] bg-white border rounded-md shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-[240px] overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.iso}
                  type="button"
                  onClick={() => handleSelect(country.code)}
                  className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${
                    value === country.code ? "bg-blue-50" : ""
                  }`}
                >
                  <Image
                    src={country.flag}
                    alt={country.name}
                    width={24}
                    height={18}
                    className="object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {country.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {country.code} • {country.iso}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};