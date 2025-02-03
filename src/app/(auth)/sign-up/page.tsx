"use client";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  EyeOffIcon,
  EyeIcon,
  Loader2,
  CircleXIcon,
  CircleCheckIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LoginSide from "@/components/LoginSide";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUSername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  //zod validation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      accountType: "personal",
    },
  });

  // import { useSession, signIn, signOut } from "next-auth/react";

  // const { data: session } = useSession()

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }

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

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error while signup of user", error);

      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      toast({
        variant: "destructive",
        title: "Uh oh! Signup failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true); // Set loading state to true when clicked

    try {
      // Trigger Google OAuth sign-in
      await signIn("google");
      toast({
        title: "Login Successful please wait",
        description: "Welcome back!",
      });
    } catch (error) {
      // Fixed syntax here
      console.error("Google Sign-In failed:", error);

      // Ensure errorMessage is a string or fallback to a default message
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Reset loading state after sign-in completes or fails
    }
  };

  return (
    <>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 sm:px-0 px-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold mt-7">Sign up</h1>
              {/* <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p> */}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <div className=" relative">
                        <FormControl>
                          <Input
                            placeholder="create username"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              debounced(e.target.value);
                              if (e.target.value === "") {
                                setUsernameMessage("");
                              }
                            }}
                          />
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

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="enter email"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toLowerCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="create password"
                            {...field}
                            className=" mb-2"
                          />
                        </FormControl>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button" // Prevent button from submitting form
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            Toggle password visibility
                          </span>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </form>
            </Form>
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn} // Use the handleGoogleSignIn function
              disabled={isSubmitting} // Disable the button when submitting
            >
              {isSubmitting ? (
                <>
                  <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                  <Image
                    className="w-4 h-4 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    width={50}
                    height={50}
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Logging in with Google</span>
                </>
              ) : (
                <>
                  <Image
                    className="w-4 h-4 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    width={50}
                    height={50}
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Continue with Google</span>
                </>
              )}
            </Button>
            <div className="mt-2 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline font-bold">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="hidden lg:flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
          <LoginSide />
        </div>
      </div>
    </>
  );
}

// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation"; // For redirect
// import { useEffect } from "react";

// export default function SignInPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session) {
//       // Redirect the user if they are already signed in
//       router.push("/dashboard");
//     }
//   }, [session, router]);

//   if (status === "loading") {
//     return <p>Loading...</p>; // Show loading state while session is loading
//   }

//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     );
//   }

//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn("credentials")}>Sign in with Email</button>
//       <button onClick={() => signIn("google")}>Sign in with Google</button>
//     </>
//   );
// }
