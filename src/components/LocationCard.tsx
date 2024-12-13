import RotatingGlobe from "./RotatingGlobe";

const LocationCard = ({ location }: { location: string }) => {
  return (
    <div className="relative bg-white rounded-xl p-5 sm:col-span-2 col-span-2 h-48 border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="text-lg font-semibold text-neutral-700">{location}</div>
      <div className="absolute bottom-5 right-5 w-52 h-52">
        <RotatingGlobe />
      </div>
    </div>
  );
};

export default LocationCard;






// import Link from "next/link";

// interface LocationCardProps {
//   location: string;
//   temperature?: string;
//   weatherCondition?: string;
// }

// const LocationCard: React.FC<LocationCardProps> = ({
//   location,
//   temperature = "25°C",
//   weatherCondition = "Sunny",
// }) => {
//   return (
//     <Link
//       href="#"
//       className="bg-gradient-to-r from-blue-200 to-blue-400 rounded-xl p-5 sm:col-span-2 col-span-2 h-48 border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300"
//     >
//       <div className="flex flex-col justify-between h-full">
//         <div className="text-lg font-semibold text-neutral-700">{location}</div>
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-4xl font-bold text-neutral-800">{temperature}</div>
//             <div className="text-sm font-medium text-neutral-600">{weatherCondition}</div>
//           </div>
//           <img
//             src={`/weather-icons/${weatherCondition.toLowerCase()}.svg`} // Add weather icons to your public folder
//             alt={weatherCondition}
//             className="w-12 h-12"
//           />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default LocationCard;
