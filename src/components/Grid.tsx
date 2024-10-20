"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Meteors } from "./ui/meteors";
import axios from "axios";

// Define prop types
interface GridProps {
  profileUpdated: boolean;
  setProfileUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Grid({ profileUpdated, setProfileUpdated }: GridProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [profileDetails, setProfileDetails] = useState({
    profilePhoto: "",
    name: "",
    username: "",
    gender: "",
    about: "",
    favoriteQuote: "",
    socialMediaLinks:[
      {
        platform:"",
        platform_username: ""
      }
    ]
  });

  // Fetch profile details
  const getProfileDetails = async () => {
    try {
      const response = await axios.get("/api/get-profile-details");
      setProfileDetails(response.data.user);  // Update profile details in state
    } catch (error) {
      console.log("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    getProfileDetails();  // Fetch details on component mount or user change
  }, [user]);

  useEffect(() => {
    if (profileUpdated) {
      getProfileDetails();  // Re-fetch details when profile is updated
      setProfileUpdated(false);  // Reset the flag after fetching
    }
  }, [profileUpdated]);

  return (
    <>
    
    <div className="w-full h-auto lg:h-screen overflow-y-auto pt-28 sm:pb-5 pb-20 md:pr-0 pr-0 lg:pr-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 m-4">
              <a href="">
                <div className="bg-[#fff7fb] rounded-md p-10 h-48"></div>
              </a>

              <div className="bg-green-200 rounded-md p-10 h-48">music</div>
              <a href={`mailto:${user?.email}`}>
                <div className="bg-[#ffdddd] rounded-md p-10 h-48">Gmail</div>
              </a>
              <div className="bg-[#E9F4FA] rounded-md p-10 h-48">linked</div>

              <div className="relative rounded-md col-span-2 h-48 overflow-hidden">
                {/* Background gradient and blur effect */}
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative shadow-xl bg-gray-900 border border-gray-800 p-10 h-full rounded-md flex flex-col items-center justify-center">
                  {/* FavQuotes component */}
                  { !profileDetails.favoriteQuote ? ( <p className="font-normal text-sm sm:text-base text-slate-400 relative z-50">
                   add your quote or thoughts here
                   </p>) : ( <p className="font-normal text-sm sm:text-base text-slate-400 relative z-50">
                    {profileDetails.favoriteQuote}
                   </p>)
                   }
                  {/* Optional text or additional content */}
                 

                  {/* Meteor effect */}
                  <Meteors number={20} />
                </div>
              </div>

              <div className="bg-gray-200 rounded-md p-10 col-span-2 row-span-2 h-[400px]">
                pic
              </div>
              <div className="bg-gray-200 rounded-md p-10 h-48">github</div>
              <div className="bg-[#ffdddd] rounded-md p-10 h-48">youtube</div>
              <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 h-48">
                occupation
              </div>
              <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 h-48">
                location
              </div>
              <div className="bg-[#e4f3ff] rounded-md p-10 h-48">twitter</div>
              <div className="bg-gray-200 rounded-md p-10 h-48">
                custom link
              </div>
             
            </div>
          </div>
    </>
  );
}

export default Grid;
