import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, CloudRain, Cloud, Wind, Droplets } from "lucide-react"; // Import Lucide icons
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";


import { GlobeDemo } from "./GlobeDemo";

interface LocationCardProps {
  location: string; // Location name fetched from the database
}

interface WeatherData {
  temperature: string | null;
  condition: string | null;
  icon: JSX.Element | null;
  error: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: null,
    condition: null,
    icon: null,
    error: false,
  });
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=${apiKey}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        console.log(response)
        if (!response.ok) {
          // Handle non-successful responses
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const temp = `${Math.round(data.main.temp)}°C`;
        const condition = data.weather[0].main;

        // Map weather conditions to Lucide icons
        const icon = (() => {
          switch (condition) {
            case "Clear":
              return <Sun className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />;
            case "Clouds":
              return <Cloud className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />;
            case "Rain":
              return <CloudRain className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />;
            case "Drizzle":
              return <Droplets className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />;
            case "Mist":
              return <Wind className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />;
            default:
              return <Sun className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />;
          }
        })();

        setWeather({ temperature: temp, condition, icon, error: false });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather({ temperature: "N/A", condition: "Unavailable", icon: null, error: true });
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <Link
      href={`https://www.google.com/maps/place/${location}`}
      target="_blank"
      className="bg-white dark:bg-black rounded-xl p-5 sm:col-span-2 col-span-2 h-48 border border-neutral-200 dark:border-neutral-800
       transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex flex-col justify-between h-full z-10 ">
        <div className="text-2xl flex flex-row gap-2 z-10  font-bold text-neutral-800 dark:text-neutral-200">
          {loading ? (
            <Skeleton className="w-8 h-8" />
          ) : (
            weather.icon
          )}
          <Separator orientation="vertical" className="w-0.5" />
          {location}
        </div>

        <div className="flex items-center justify-between z-10">
          <div>
            <div className="text-3xl font-bold text-neutral-700 dark:text-neutral-300">
              {loading ? (
                <Skeleton className="h-12 w-20" />
              ) : (
                weather.temperature
              )}
            </div>
            <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {loading ? (
                <Skeleton className="w-10 h-5 mt-2" />
              ) : (
                weather.condition
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add GlobeDemo in the bottom right corner */}
      <div className="absolute top-0 left-[45%] w-full h-full z-0">
  <GlobeDemo/>
      </div>
    </Link>
  );
};

export default LocationCard;
