"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import female from "@/assets/female.png";
import male from "@/assets/male.png";
import { useState, useEffect } from "react";
import Grid from "@/components/Grid";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddDetails from "@/components/AddDetails";
import Background from "@/components/Background";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/Loading";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [profileDetails, setProfileDetails] = useState({
    profilePhoto: "",
    name: "",
    username: "",
    gender: "",
    about: "",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false); // Track profile updates

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  // Fetch profile details
  const getProfileDetails = async () => {
    try {
      const response = await axios.get("/api/get-profile-details");
      setProfileDetails(response.data.user); // Update profile details in state
    } catch (error) {
      console.log("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    getProfileDetails(); // Fetch details when the component mounts or user changes
  }, [user]);

  useEffect(() => {
    if (profileUpdated) {
      getProfileDetails(); // Re-fetch details when profile is updated
      setProfileUpdated(false); // Reset the flag after fetching
    }
  }, [profileUpdated]);

  return (
    <>
      <div className="relative w-full min-h-screen">
        <Background />

        {!user ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col lg:flex-row w-full h-full">
              <div className="lg:w-[35%] flex-shrink-0 flex flex-col justify-between w-full h-auto lg:h-full pt-28 pb-5 sm:pl-10 pl-5">
                <div>
                  <div className="relative w-36 h-36 rounded-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center">
                    <Image
                      src={
                        profileDetails.profilePhoto ||
                        (profileDetails.gender === "Female" ? female : male)
                      }
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>

                  <div className="mt-10">
                    <h1 className="sm:text-5xl text-4xl font-bold dark:text-neutral-300">
                      {profileDetails.name || user?.name}
                    </h1>
                    <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-500 sm:text-base text-sm">
                      @{profileDetails.username || user?.username}
                    </h2>
                    <p className=" mt-3 font-medium dark:text-neutral-400 text-neutral-700 ">
                      {profileDetails.about}
                    </p>

                    <Button
                      onClick={handleDrawerOpen}
                      size={"sm"}
                      className=" mt-10"
                    >
                      Profile
                    </Button>

                    {/* Pass the open state and close handler to the Drawer component */}
                    <AddDetails
                      isOpen={isDrawerOpen}
                      onClose={handleDrawerClose}
                      setProfileUpdated={setProfileUpdated} // Ensure this function updates the profile state
                      onUpdate={getProfileDetails} // Trigger fetching updated profile details after update
                    />
                  </div>
                </div>
                <div className="absolute sm:left-10 sm:bottom-2 -bottom-10 sm:space-y-7 space-y-7 pb-3 left-3">
                  <div className="flex flex-row text-sm sm:text-base">
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Powered by{" "}
                      <Link
                        href="/"
                        className="underline text-neutral-800 hover:text-black duration-200 dark:text-neutral-300 dark:hover:text-neutral-50"
                      >
                        ProfileCraft
                      </Link>
                    </p>
                    <Separator
                      orientation="vertical"
                      className="h-auto w-[1px] bg-gray-300 mx-4"
                    />{" "}
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Developed by{" "}
                      <Link
                        href="https://devadil.vercel.app/"
                        target="_blank"
                        className=" text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-50 font-semibold hover:text-black duration-200"
                      >
                        Adil
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side (Scrollable) */}
              <Grid
                profileUpdated={profileUpdated}
                setProfileUpdated={setProfileUpdated}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
