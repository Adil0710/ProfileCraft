import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, CloudRain, Cloud, Wind, Droplets } from "lucide-react"; // Import Lucide icons
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";

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
        console.log(response);
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
              return <Sun className="w-8 h-8 text-neutral-800 " />;
            case "Clouds":
              return <Cloud className="w-8 h-8 text-neutral-800" />;
            case "Rain":
              return <CloudRain className="w-8 h-8 text-neutral-800" />;
            case "Drizzle":
              return <Droplets className="w-8 h-8 text-neutral-800" />;
            case "Mist":
              return <Wind className="w-8 h-8 text-neutral-800" />;
            default:
              return <Sun className="w-8 h-8 text-neutral-800" />;
          }
        })();

        setWeather({ temperature: temp, condition, icon, error: false });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather({
          temperature: "N/A",
          condition: "Unavailable",
          icon: null,
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <motion.div
      initial={{
        offset: 6,
        opacity: 0,
        filter: "blur(6px)",
      }}
      animate={{
        offset: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: 0.04 + 0.6,
          duration: 0.4,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true }}
      className=" bg-gradient-to-br  dark:from-gray-200 dark:to-gray-950  from-gray-50 to-gray-950 rounded-xl p-5 sm:col-span-3 col-span-1 h-48  
    relative overflow-hidden cursor-pointer"
    >
       <div className="sm:block hidden absolute inset-0 bg-[url(https://res.cloudinary.com/eldoraui/image/upload/v1734021299/map_pcqdwb.png)] bg-[length:530px_430px] bg-[right_-75px] bg-no-repeat [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
      <Link
        href={`https://www.google.com/maps/place/${location}`}
        target="_blank"
      >
        <div className="flex flex-col justify-between h-full z-10 ">
          <div className="text-2xl flex flex-row gap-2 z-10  font-bold text-neutral-800 ">
            {loading ? <Skeleton className="w-8 h-8" /> : weather.icon}
            <Separator
              orientation="vertical"
              className="w-0.5 bg-neutral-500 rounded-full"
            />
            {location}
          </div>

          <div className="flex items-center justify-between z-10">
            <div>
              <div className="text-3xl font-bold text-neutral-800 ">
                {loading ? (
                  <Skeleton className="h-12 w-20" />
                ) : (
                  weather.temperature
                )}
              </div>
              <div className="text-sm font-medium text-neutral-800 ">
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
        <div className="absolute top-0 left-[45%] w-full h-full z-0"></div>
      </Link>
    </motion.div>
  );
};

export default LocationCard;
