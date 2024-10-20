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
import axios from "axios";
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
import { Loader2 } from "lucide-react";

// Hardcoded platforms
const platforms = [
  { platform: "Instagram" },
  { platform: "Spotify" },
  { platform: "LinkedIn" },
  { platform: "GitHub" },
  { platform: "YouTube" },
  { platform: "Twitter" },
  { platform: "Custom" },
];

// Zod schema for validation
const profileSchema = z.object({
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

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      socialLinks,
      name: "",
      about: "",
      occupation: "",
      favoriteQuote: "",
      gender: "",
      location: "",
    },
  });

  // Fetch profile details and set them in form when drawer opens
  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const response = await axios.get("/api/get-profile-details");
        const user = response.data.user;

        const fetchedLinks = platforms.map((platform) => ({
          platform: platform.platform,
          platform_username:
            user.socialMediaLinks?.find(
              (link: any) => link.platform === platform.platform
            )?.platform_username || "", // Set existing username or leave blank
        }));

        setSocialLinks(fetchedLinks);
        setSelectedGender(user.gender || null); // Set gender from fetched data

        form.reset({
          socialLinks: fetchedLinks,
          name: user.name || "",
          about: user.about || "",
          occupation: user.occupation || "",
          favoriteQuote: user.favoriteQuote || "",
          gender: user.gender || "",
          location: user.location || "",
        }); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching profile details:", error);
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
      const response = await fetch("/api/add-profile-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send all form data
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Profile updated successfully:", result);
        setProfileUpdated(true); // Set profile updated state
        onUpdate(); // Call the onUpdate function
        onClose(); // Close the drawer after successful submission
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        console.error("Failed to update profile:", result.message);
        toast({
          variant: "destructive",
          title: "Uh oh! failed to save profile",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! error occured see console",
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
          <div className="mx-auto w-full sm:px-0 px-5 max-w-lg">
            <DrawerHeader className=" flex items-center justify-center flex-col">
              <DrawerTitle>Profile</DrawerTitle>
              <DrawerDescription>Add or update profile</DrawerDescription>
            </DrawerHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-5"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your current occupation"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* About Field */}
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          {...field}
                          rows={3}
                          className="resize-none"
                          maxLength={200}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="mt-1 text-right text-xs text-gray-500">
                        Max 200 characters
                      </div>
                    </FormItem>
                  )}
                />

                {/* Occupation Field */}
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your current occupation"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender Dropdown */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={() => (
                    <FormItem>
                        <div className="flex w-full items-center gap-5">
                        <FormLabel className="flex-shrink-0 w-1/6 text-left">Gender</FormLabel>
                      
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button className="flex-grow" variant="outline">
                            {selectedGender ? selectedGender : "Select Gender"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64">
                          <DropdownMenuLabel>Choose Gender</DropdownMenuLabel>
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
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Favorite Quote Field */}
                <FormField
                  control={form.control}
                  name="favoriteQuote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favorite Quote</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your favorite quote"
                          {...field}
                          rows={3}
                          className="resize-none"
                          maxLength={200}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="mt-1 text-right text-xs text-gray-500">
                        Max 200 characters
                      </div>
                    </FormItem>
                  )}
                />
                {/* Social Media Links */}
                {socialLinks.map((link, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`socialLinks.${index}.platform_username`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex w-full items-center gap-5">
                          <FormLabel className="flex-shrink-0 w-1/6 text-left">
                            {link.platform}
                          </FormLabel>
                          <FormControl className="flex-grow">
                            <Input
                              placeholder={
                                link.platform === "Spotify"
                                  ? "song or playlist link"
                                  : link.platform === "YouTube"
                                  ? "include @  |  e.g. @Coding_with_Adil"
                                  : link.platform === "Custom"
                                  ? "Your custom link"
                                  : `${link.platform} username`
                              }
                              value={link.platform_username}
                              onChange={(e) =>
                                handleUsernameChange(index, e.target.value)
                              }
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Location Field */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex w-full items-center gap-5">
                        <FormLabel className="flex-shrink-0 w-1/6 text-left">
                          Location
                        </FormLabel>
                        <FormControl className="flex-grow">
                          <Input placeholder="Your location" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DrawerFooter>
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
