"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import female from "@/assets/female.png";
import male from "@/assets/male.png";
import { Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Meteors } from "@/components/ui/meteors";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | null
  >(null);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);
  const [layout, setLayout] = useState<Layout[]>([
    { i: "insta", x: 0, y: 0, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "twitter", x: 1, y: 0, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "music", x: 2, y: 0, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "linked", x: 3, y: 0, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "content", x: 0, y: 1, w: 2, h: 2, minW: 2, minH: 2 },
    { i: "pic", x: 2, y: 1, w: 2, h: 2, minW: 2, minH: 2 },
    { i: "github", x: 0, y: 2, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "youtube", x: 1, y: 2, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "occupation", x: 2, y: 2, w: 2, h: 2, minW: 2, minH: 2 },
    { i: "location", x: 0, y: 3, w: 2, h: 2, minW: 2, minH: 2 },
    { i: "customLink", x: 2, y: 3, w: 2, h: 2, minW: 2, minH: 2 },
  ]);

  const profileImage = React.useMemo(() => {
    if (user?.image) return user.image;
    if (selectedGender === "male") return male.src;
    if (selectedGender === "female") return female.src;
    return null;
  }, [user?.image, selectedGender]);

  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  return (
    <>
      <div className="relative w-full min-h-screen">
        <div className="main">
          <div className="content"></div>
        </div>

        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="lg:w-[35%] flex-shrink-0 flex flex-col justify-between w-full h-auto lg:h-full pt-28 pb-5 pl-10">
            <div>
              <div className="relative w-32 h-32 rounded-full bg-slate-300 dark:bg-slate-800">
                {!profileImage ? (
                  <span className="absolute bottom-3 right-6">
                    Set DP &#8600;
                  </span>
                ) : (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="rounded-full"
                  />
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Edit className="cursor-pointer w-5 h-5 text-slate-500 dark:text-slate-600 absolute -right-0.5 bottom-0.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-30">
                    <DropdownMenuLabel>Set your DP</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedGender === "male"}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedGender("male");
                        else setSelectedGender(null);
                      }}
                    >
                      Male
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedGender === "female"}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedGender("female");
                        else setSelectedGender(null);
                      }}
                    >
                      Female
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-10">
                <h1 className="text-5xl font-bold">{user?.name}</h1>
                <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-400">
                  @{user?.username}
                </h2>
              </div>
            </div>
            <div className="absolute left-10 bottom-5 lg:static">
              <h1>Adil</h1>
            </div>
          </div>

          <div className="w-full h-auto lg:h-screen overflow-y-auto pt-28 pb-5 sm:pr-10 pr-0">
            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layout }}
              cols={{ lg: 4, md: 4, sm: 3, xs: 3, xxs: 2 }}
              rowHeight={100}
              width={gridWidth}
              draggableHandle=".drag-handle" // Handles that enable dragging
              isResizable={true}
              isDraggable={true}
              onLayoutChange={onLayoutChange}
            >
              <div
                key="insta"
                className="bg-[#ffc9e1] rounded-2xl p-10 drag-handle"
              >
                insta
              </div>
              <div
                key="twitter"
                className="bg-neutral-200 rounded-2xl p-10 drag-handle"
              >
                twitter
              </div>
              <div
                key="music"
                className="bg-green-200 rounded-2xl p-10 drag-handle"
              >
                music
              </div>
              <div
                key="linked"
                className="bg-[#e1f0ff] rounded-2xl p-10 drag-handle"
              >
                linked
              </div>
              <div
                key="content"
                className="relative rounded-2xl col-span-2 overflow-hidden drag-handle"
              >
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-gray-900 border border-gray-800 sm:px-10 px-2 h-full rounded-2xl flex flex-col justify-center items-center">
                  <p className="font-normal sm:text-base text-sm text-slate-500 relative z-50">
                    I don&apos;t know what to write so I&apos;ll just paste
                    something cool here. One more sentence because lorem ipsum
                    is just unacceptable. Won&apos;t ChatGPT the shit out of
                    this.
                  </p>
                  <Meteors number={20} />
                </div>
              </div>
              <div
                key="pic"
                className="bg-gray-200 rounded-2xl p-10 drag-handle"
              >
                pic
              </div>
              <div
                key="github"
                className="bg-gray-200 rounded-2xl p-10 drag-handle"
              >
                github
              </div>
              <div
                key="youtube"
                className="bg-gray-200 rounded-2xl p-10 drag-handle"
              >
                youtube
              </div>
              <div
                key="occupation"
                className="bg-gray-200 rounded-2xl p-10 drag-handle"
              >
                occupation
              </div>
              <div
                key="location"
                className="bg-gray-200 rounded-2xl p-10 drag-handle"
              >
                location
              </div>
              <div
                key="customLink"
                className="bg-gray-200 rounded-2xl p-10 drag-handle"
              >
                customLink
              </div>
            </ResponsiveGridLayout>
          </div>
        </div>
      </div>
    </>
  );
}

{/* <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Edit className="cursor-pointer w-5 h-5 text-slate-500 dark:text-slate-600 absolute -right-0.5 bottom-0.5" />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-30">
    <DropdownMenuLabel>Set your DP</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={selectedGender === "male"}
      onCheckedChange={(checked) => {
        if (checked) setSelectedGender("male");
        else setSelectedGender(null);
      }}
    >
      Male
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={selectedGender === "female"}
      onCheckedChange={(checked) => {
        if (checked) setSelectedGender("female");
        else setSelectedGender(null);
      }}
    >
      Female
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>; */}





// "use client";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import female from "@/assets/female.png";
// import male from "@/assets/male.png";
// import React, { useState } from "react";
// import Grid from "@/components/Grid";

// export default function DashboardPage() {
//   const { data: session, update } = useSession();
//   const user = session?.user;

//   const [newProfilePhoto, setNewProfilePhoto] = useState<string>("");
//   const [about, setAbout] = useState<string>(user?.about || "");
//   const [favoriteQuote, setFavoriteQuote] = useState<string>(user?.favoriteQuote || "");
//   const [gender, setGender] = useState<string>(user?.gender || "");
//   const [occupation, setOccupation] = useState<string>(user?.occupation || "");
//   const [location, setLocation] = useState<string>(user?.location || "");
//   const [socialMediaLinks, setSocialMediaLinks] = useState(user?.socialMediaLinks || {});

//   const handleProfileUpdate = async () => {
//     const response = await fetch("/api/add-profile-details", {
//       method: "PUT",
//       body: JSON.stringify({
//         about,
//         favoriteQuote,
//         profilePhoto: newProfilePhoto,
//         gender,
//         occupation,
//         location,
//         socialMediaLinks,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       const { user: updatedUser } = await response.json();

//       // Update the session with the new user data
//       await update({ user: { ...session?.user, ...updatedUser } });
//       setNewProfilePhoto(""); // Clear input after update
//     } else {
//       console.error("Failed to update profile");
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen">
//       <div className="main">
//         <div className="content"></div>
//       </div>

//       {/* Left Side (Fixed) */}
//       <div className="flex flex-col lg:flex-row w-full h-full">
//         <div className="lg:w-[35%] flex-shrink-0 flex flex-col justify-between w-full h-auto lg:h-full pt-28 pb-5 pl-10">
//           <div>
//             <div className="relative w-36 h-36 rounded-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center">
//               <Image
//                 src={user?.profilePhoto || (user?.gender === "female" ? female : male)}
//                 alt="Profile"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-full"
//               />
//             </div>

//             <div className="mt-10">
//               <h1 className="text-5xl font-bold">{user?.name}</h1>
//               <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-400">
//                 @{user?.username}
//               </h2>
//             </div>

//             {/* Input for updating profile details */}
//             <div className="mt-4">
//               <input
//                 type="text"
//                 value={newProfilePhoto}
//                 onChange={(e) => setNewProfilePhoto(e.target.value)}
//                 placeholder="Enter new profile photo URL"
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 value={about}
//                 onChange={(e) => setAbout(e.target.value)}
//                 placeholder="About you"
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 value={favoriteQuote}
//                 onChange={(e) => setFavoriteQuote(e.target.value)}
//                 placeholder="Favorite Quote"
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 placeholder="Gender"
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 value={occupation}
//                 onChange={(e) => setOccupation(e.target.value)}
//                 placeholder="Occupation"
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Location"
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               {/* Add logic for handling social media links if necessary */}
//               <button
//                 onClick={handleProfileUpdate}
//                 className="bg-blue-500 text-white rounded p-2 mt-2"
//               >
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Side (Scrollable) */}
//         <Grid />
//       </div>
//     </div>
//   );
// }
