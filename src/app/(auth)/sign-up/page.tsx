"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  EyeOffIcon,
  EyeIcon,
  Loader2,
  CircleX,
  CircleXIcon,
  CircleCheckIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      let errorMessage = axiosError.response?.data.message;

      toast({
        variant: "destructive",
        title: "Uh oh! Signup failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 sm:px-0 px-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
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
                        <Input placeholder="enter your name" {...field} />
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
                      <FormControl>
                        <Input
                          placeholder="create u username"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                            if (e.target.value === "") {
                              setUsernameMessage("")
                            }
                          }}
                        />
                      </FormControl>
                      {isCheckingUsername && (
                        <Loader2 className=" animate-spin" />
                      )}

                      {/* Conditionally render the success or error message */}
                      {!isCheckingUsername &&
                        usernameMessage &&
                        (usernameMessage === "Username is available" ? (
                          <p className="text-sm text-green-500 flex items-center">
                            <CircleCheckIcon className="mr-1 text-sm" />
                            {usernameMessage}
                          </p>
                        ) : (
                          <p className="text-sm text-red-500 flex items-center">
                            <CircleXIcon className="mr-1" />
                            {usernameMessage}
                          </p>
                        ))}

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
                            placeholder="create a password"
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
              onClick={() => signIn("google")}
            >
              <Image
                className="w-4 h-4 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width={50}
                height={50}
                loading="lazy"
                alt="google logo"
              />
              <span>Continue with Google</span>
            </Button>
            <div className="mt-2 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <ModeToggle />
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
