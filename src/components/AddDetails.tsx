"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckIcon, CircleXIcon, Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import Logo from "./Logo";
import { ApiResponse } from "@/types/ApiResponse";
import { useDebounceCallback } from "usehooks-ts";

// Hardcoded platforms
const platforms = [
  { platform: "instagram" },
  { platform: "threads" },
  { platform: "spotify" },
  { platform: "linkedin" },
  { platform: "github" },
  { platform: "youtube" },
  { platform: "twitter" },
  { platform: "custom" },
];

// Zod schema for validation
const profileSchema = z.object({
  username: z.string() .regex(/^(?!.*[^\w_]).*$/, "Special characters and space not allowed"),
  name: z.string(),
  socialLinks: z.array(
    z.object({
      platform: z.string(),
      platform_username: z.string(),
    })
  ),
  about: z.string().optional(),
  occupation: z.string().optional(),
  favoriteQuote: z.string().optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
  image: z.instanceof(File).optional(),
  profilePhoto: z.instanceof(File).optional(),
});

interface SocialLink {
  platform: string;
  platform_username: string;
}

interface AddDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  setProfileUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void; // Function to call after successful update
}

export default function AddDetails({
  isOpen,
  onClose,
  setProfileUpdated,
  onUpdate,
}: AddDetailsProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    platforms.map((platform) => ({ ...platform, platform_username: "" }))
  );

  const { toast } = useToast();
  const [selectedGender, setSelectedGender] = useState<string | null>(null); // State for gender selection
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUSername] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      socialLinks,
      username: "",
      name: "",
      about: "",
      occupation: "",
      favoriteQuote: "",
      gender: "",
      location: "",
      image: undefined,
    },
  });

  // Fetch profile details and set them in form when drawer opens
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUSername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error Checking username"
          );
        } finally {
          setIsCheckingUSername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);
  useEffect(() => {
    const getProfileDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/get-profile-details");
        const user = response.data.user;

        const fetchedLinks = platforms.map((platform) => ({
          platform: platform.platform,
          platform_username:
            user.socialMediaLinks?.find(
              (link: SocialLink) => link.platform === platform.platform
            )?.platform_username || "", // Set existing username or leave blank
        }));

        setSocialLinks(fetchedLinks);
        setSelectedGender(user.gender || null); // Set gender from fetched data

        form.reset({
          socialLinks: fetchedLinks,
          username: user.username || "",
          name: user.name || "",
          about: user.about || "",
          occupation: user.occupation || "",
          favoriteQuote: user.favoriteQuote || "",
          gender: user.gender || "",
          location: user.location || "",
        }); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching profile details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      getProfileDetails(); // Fetch when drawer is opened
    }
  }, [isOpen, form]);

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    console.log("Form Data Submitted:", data);
    setIsSubmitting(true);

    try {
      // Create FormData to handle multipart/form-data
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("name", data.name);
      formData.append("about", data.about || "");
      formData.append("occupation", data.occupation || "");
      formData.append("favoriteQuote", data.favoriteQuote || "");
      formData.append("gender", data.gender || "");
      formData.append("location", data.location || "");

      // Add socialLinks as a JSON string
      formData.append("socialLinks", JSON.stringify(data.socialLinks || []));

      // Add files (if selected)
      if (data.image) formData.append("image", data.image);
      if (data.profilePhoto) formData.append("profilePhoto", data.profilePhoto);

      // Send FormData to the server
      const response = await fetch("/api/add-profile-details", {
        method: "PUT",
        body: formData, // Send FormData directly
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Profile updated successfully:", result);
        setProfileUpdated(true);
        onUpdate();
        onClose();
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        console.error("Failed to update profile:", result.message);
        toast({
          variant: "destructive",
          title: "Uh oh! Failed to save profile",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Error occurred",
        description: "Error during profile update",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update form state when user changes a username
  const handleUsernameChange = (index: number, username: string) => {
    setSocialLinks((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, platform_username: username } : link
      )
    );
    form.setValue(`socialLinks.${index}.platform_username`, username);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <ScrollArea className=" overflow-y-auto">
          <div className="mx-auto w-full sm:px-0 px-3 max-w-xl">
            <DrawerHeader className=" flex items-center justify-center flex-col">
              <DrawerTitle>Profile</DrawerTitle>
              <DrawerDescription>Add or update profile</DrawerDescription>
            </DrawerHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-8 grid grid-cols-2 gap-x-4 mt-5"
              >
                <div className=" col-span-2 grid grid-cols-2 gap-x-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className=" col-span-1">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          {loading ? (
                            <Skeleton className=" h-6 w-full" />
                          ) : (
                            <Input
                              placeholder="Your current occupation"
                              {...field}
                            />
                          )}
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* USername Field */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className=" col-span-1">
                        <FormLabel>Username</FormLabel>
                        <div className=" relative">
                        <FormControl>
                          {loading ? (
                            <Skeleton className=" h-6 w-full" />
                          ) : (
                            <Input placeholder="Username" {...field}   onChange={(e) => {
                              field.onChange(e);
                              debounced(e.target.value);
                              if (e.target.value === "") {
                                setUsernameMessage("");
                              }
                            }}/>
                          )}
                        </FormControl>
                        {isCheckingUsername && (
                          <Loader2
                            className="absolute right-2 top-1/2 h-4 w-4 animate-spin"
                            style={{ marginTop: "-2.2%" }}
                          />
                        )}
                        {!isCheckingUsername &&
                          usernameMessage &&
                          (usernameMessage === "Username is available" ? (
                            <CircleCheckIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                          ) : (
                            <CircleXIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                          ))}
                      </div>
                      {usernameMessage && (
                        <p
                          className={`text-sm flex items-center ${
                            usernameMessage === "Username is available"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {usernameMessage}
                        </p>
                      )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Social Media Links */}
                {socialLinks.map((link, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`socialLinks.${index}.platform_username`}
                    render={({}) => (
                      <FormItem className=" col-span-1">
                        <div className="flex flex-col w-full gap-3">
                          <FormLabel>
                            <Logo
                              name={
                                link.platform as
                                  | "instagram"
                                  | "threads"
                                  | "spotify"
                                  | "twitter"
                                  | "gmail"
                                  | "linkedin"
                                  | "github"
                                  | "youtube"
                                  | "rocket"
                              }
                            />
                          </FormLabel>
                          <FormControl className="flex-grow">
                            {loading ? (
                              <Skeleton className=" h-6 w-full" />
                            ) : (
                              <Input
                                placeholder={
                                  link.platform === "spotify"
                                    ? "song or playlist link"
                                    : link.platform === "custom"
                                    ? "Your custom link | e.g. https://devadil.vercel.app/"
                                    : link.platform === "linkedIn"
                                    ? "LinkedIn profile URL"
                                    : `${link.platform} username`
                                }
                                value={link.platform_username}
                                onChange={(e) =>
                                  handleUsernameChange(index, e.target.value)
                                }
                              />
                            )}
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <div className=" col-span-2 grid grid-cols-2 gap-x-4">
                  {/* Location Field */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className=" col-span-1">
                        <div className="flex w-full flex-col gap-5">
                          <FormLabel>Location</FormLabel>
                          <FormControl className="flex-grow">
                            {loading ? (
                              <Skeleton className=" h-6 w-full" />
                            ) : (
                              <Input placeholder="Your city" {...field} />
                            )}
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Occupation Field */}
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem className=" col-span-1">
                        <div className="flex flex-col w-full  gap-5">
                          <FormLabel>Occupation</FormLabel>
                          <FormControl className="flex-grow">
                            {loading ? (
                              <Skeleton className=" h-6 w-full" />
                            ) : (
                              <Input
                                placeholder="Your current occupation"
                                {...field}
                              />
                            )}
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" col-span-2 grid grid-cols-2 gap-x-4">
                  {/* Favorite Quote Field */}
                  <FormField
                    control={form.control}
                    name="favoriteQuote"
                    render={({ field }) => (
                      <FormItem className=" col-span-1">
                        <FormLabel>Favorite Quote</FormLabel>
                        <FormControl>
                          {loading ? (
                            <div>
                              <Skeleton className=" h-6 w-full" />

                              <Skeleton className=" h-6 w-1/2 mt-3" />
                            </div>
                          ) : (
                            <Textarea
                              placeholder="Your favorite quote"
                              {...field}
                              rows={3}
                              className="resize-none"
                              maxLength={200}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                        <div className="mt-1 text-right text-xs text-gray-500">
                          Max 200 characters
                        </div>
                      </FormItem>
                    )}
                  />
                  {/* About Field */}
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem className=" col-span-1">
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          {loading ? (
                            <div>
                              <Skeleton className=" h-6 w-full" />

                              <Skeleton className=" h-6 w-1/2 mt-3" />
                            </div>
                          ) : (
                            <Textarea
                              placeholder="Tell us about yourself"
                              {...field}
                              rows={3}
                              className="resize-none"
                              maxLength={200}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                        <div className="mt-1 text-right text-xs text-gray-500">
                          Max 200 characters
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" col-span-2 grid grid-cols-2 gap-x-4">
                  {/* Gender Dropdown */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={() => (
                      <FormItem className=" col-span-1">
                        <div className="flex flex-col w-full gap-3">
                          <FormLabel>Gender</FormLabel>
                          {loading ? (
                            <Skeleton className=" h-6 w-full" />
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="flex-grow" variant="outline">
                                  {selectedGender
                                    ? selectedGender
                                    : "Select Gender"}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-64">
                                <DropdownMenuLabel>
                                  Choose Gender
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                  checked={selectedGender === "male"}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedGender("Male");
                                      form.setValue("gender", "Male");
                                    }
                                  }}
                                >
                                  Male
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                  checked={selectedGender === "Female"}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedGender("Female");
                                      form.setValue("gender", "Female");
                                    }
                                  }}
                                >
                                  Female
                                </DropdownMenuCheckboxItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Image */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="cursor-pointer col-span-1">
                        <div className="flex w-full flex-col gap-3">
                          <FormLabel>Image</FormLabel>
                          <FormControl className="flex-grow">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]; // Get the selected file
                                field.onChange(file); // Update the field with the selected file
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DrawerFooter className=" col-span-2 px-0">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <DrawerClose>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
