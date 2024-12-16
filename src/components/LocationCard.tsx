// import RotatingGlobe from "./RotatingGlobe";

// const LocationCard = ({ location }: { location: string }) => {
//   return (
//     <div className="relative bg-white rounded-xl p-5 sm:col-span-2 col-span-2 h-48 border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300">
//       <div className="text-lg font-semibold text-neutral-700">{location}</div>
//       <div className="absolute bottom-5 right-5 w-52 h-52">
//         <RotatingGlobe />
//       </div>
//     </div>
//   );
// };

// export default LocationCard;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, CloudRain, Cloud, Wind, Droplets } from "lucide-react"; // Import Lucide icons
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { GlobeDemo } from "./GlobeDemo";

interface LocationCardProps {
  location: string; // Location name fetched from the database
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const [temperature, setTemperature] = useState<string | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<string | null>(null);
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=${apiKey}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        console.log(response);

        if (response.status === 404) {
          setTemperature("N/A");
          setWeatherCondition("Not Found");
          setIcon(null);
        } else {
          const data = await response.json();
          const temp = Math.round(data.main.temp) + "°C";
          const condition = data.weather[0].main;

          setTemperature(temp);
          setWeatherCondition(condition);

          // Map weather conditions to Lucide icons
          switch (condition) {
            case "Clear":
              setIcon(
                <Sun className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />
              );
              break;
            case "Clouds":
              setIcon(
                <Cloud className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />
              );
              break;
            case "Rain":
              setIcon(
                <CloudRain className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />
              );
              break;
            case "Drizzle":
              setIcon(
                <Droplets className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />
              );
              break;
            case "Mist":
              setIcon(
                <Wind className="w-8 h-8 text-neutral-800 dark:text-neutral-300" />
              );
              break;
            default:
              setIcon(<Sun className="w-8 h-8 " />); // Default icon
              break;
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setTemperature("Error");
        setWeatherCondition("Unavailable");
        setIcon(null);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <Link
      href="#"
      className="bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 rounded-xl p-5 sm:col-span-2 col-span-2 h-48 border border-neutral-200 dark:border-neutral-800
       transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="text-2xl flex flex-row gap-2 font-bold text-neutral-800 dark:text-neutral-200">
          {icon} <Separator orientation="vertical" className="w-0.5" />{" "}
          {location}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-neutral-700 dark:text-neutral-300">
              {temperature || <Skeleton className="h-12 w-20" />}
            </div>
            <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {weatherCondition || <Skeleton className="w-10 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Add GlobeDemo in the bottom right corner */}
      <div className="absolute top-5 -right-[45%] w-full h-full z-40">
        <GlobeDemo />
      </div>
    </Link>
  );
};

export default LocationCard;
