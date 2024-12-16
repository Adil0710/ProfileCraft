"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import female from "@/assets/female.png";
import male from "@/assets/male.png";
import { useState, useEffect, ReactNode, useCallback, useRef } from "react";
import Grid from "@/components/Grid";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddDetails from "@/components/AddDetails";
import Background from "@/components/Background";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/Loading";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  Copy,
  LoaderCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const profilePhotoSchema = z.object({
  profilePhoto: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must not exceed 5MB",
    })
    .optional(),
});

interface Button {
  idle: ReactNode;
  loading: ReactNode;
  success: ReactNode;
}

const buttonCopy: Button = {
  idle: <Copy size={16} />,
  loading: <LoaderCircle size={16} className="animate-spin" />,
  success: <Check size={16} className=" text-green-500" />,
};

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

  const [baseURL, setBaseURL] = useState(""); // Store baseURL in state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false); // Track profile updates
  const [buttonState, setButtonState] = useState<keyof Button>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file with Zod schema
    const validation = profilePhotoSchema.safeParse({ profilePhoto: file });

    if (!validation.success) {
      // Show toast for validation errors
      toast({
        variant: "destructive",
        title: "Error",
        description: validation.error.issues[0].message,
      });
      return;
    }

    // Upload file
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("profilePhoto", file);

      const response = await fetch("/api/add-profile-details", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile photo uploaded successfully",
        });
        const uploadedPhotoUrl = URL.createObjectURL(file); // Or use the URL from the server response if returned
        setProfileDetails((prevDetails) => ({
          ...prevDetails,
          profilePhoto: uploadedPhotoUrl,
        }));
        setProfileUpdated(true);
      } else {
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: result.message || "Failed to upload profile photo",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred while uploading the profile photo:- ${error}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("profilePhoto", " "); // Send empty value to remove the photo

      const response = await fetch("/api/add-profile-details", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile photo removed successfully",
        });
        setProfileDetails((prevDetails) => ({
          ...prevDetails,
          profilePhoto: "", // Clear the profile photo URL in the state
        }));
        setProfileUpdated(true);
      } else {
        toast({
          variant: "destructive",
          title: "Removal Failed",
          description: result.message || "Failed to remove profile photo",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred while removing the profile photo ${error}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

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
  }, []);

  useEffect(() => {
    if (profileUpdated) {
      getProfileDetails(); // Re-fetch details when profile is updated
      setProfileUpdated(false); // Reset the flag after fetching
    }
  }, [profileUpdated]);

  const handleClick = useCallback(() => {
    const textToCopy = `${baseURL}/${profileDetails.username}`;

    // Set button state to "loading" and copy the text
    setButtonState("loading");
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Successfully copied, set button state to "success"
        setButtonState("success");
        toast({
          title: "Copied to clipboard",
          description: "Link copied to clipboard successfully",
        });
      })
      .catch(() => {
        // Handle errors if needed (e.g., if permissions are denied)
      });

    // Reset button state to "idle" after 3 seconds
    setTimeout(() => {
      setButtonState("idle");
    }, 3000);
  }, [baseURL, profileDetails.username]);

  // Set baseURL in a useEffect to ensure it only runs on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseURL(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

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
                    {isUploading ? (
                      <div className=" border-black/70 h-16 w-16 animate-spin dark:border-white/70 border-b-2 rounded-full"></div>
                    ) : (
                      <Image
                      src={
                        profileDetails.profilePhoto && profileDetails.profilePhoto.trim() !== ""
                          ? profileDetails.profilePhoto
                          : (profileDetails.gender === "Female" ? female : male)
                      }
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      priority
                    />
                    
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div
                      className={`z-10 absolute right-2.5 bottom-0 bg-gray-500/85 cursor-pointer text-white rounded-full px-1 flex justify-center items-center py-1 ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          {" "}
                          <Camera />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Profile Photo</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className=" flex flex-row items-center gap-2"
                            onClick={() =>
                              !isUploading && fileInputRef.current?.click()
                            }
                          >
                            <Upload size={15} />
                            Upload
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className=" flex flex-row items-center gap-2 text-red-500 focus:text-red-600"
                            onClick={handleRemovePhoto}
                          >
                            <Trash2 size={15} /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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

                    <div className="flex flex-row mt-10">
                      {/* Profile Button */}
                      <Button onClick={handleDrawerOpen} size="sm">
                        Profile
                      </Button>

                      <Separator
                        orientation="vertical"
                        className="h-auto w-[1px] bg-gray-300 dark:bg-neutral-600 mx-5"
                      />

                      {/* Input with Copy Button */}
                      <div className="relative flex items-center w-[70%] h-9 bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-900">
                        {/* Disabled Input */}
                        <input
                          className="w-full h-full px-4 bg-transparent outline-none sm:text-sm font-medium text-xs cursor-text"
                          disabled
                          value={`${baseURL}/${profileDetails.username}`}
                        />

                        {/* Copy Button */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <button
                            className="relative flex items-center justify-center px-2 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 dark:hover:bg-black border border-gray-200 dark:border-neutral-700 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:border-dark3 dark:bg-dark1"
                            disabled={buttonState === "loading"}
                            onClick={handleClick}
                          >
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                transition={{
                                  type: "spring",
                                  duration: 0.3,
                                  bounce: 0,
                                }}
                                initial={{
                                  opacity: 0,
                                  y: -10,
                                  filter: "blur(10px)",
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  filter: "blur(0px)",
                                }}
                                exit={{
                                  opacity: 0,
                                  y: 10,
                                  filter: "blur(10px)",
                                }}
                                key={buttonState}
                                className="flex items-center justify-center"
                              >
                                {buttonCopy[buttonState]}
                              </motion.span>
                            </AnimatePresence>
                          </button>
                        </div>
                      </div>
                    </div>

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
                      className="h-auto w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4"
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
