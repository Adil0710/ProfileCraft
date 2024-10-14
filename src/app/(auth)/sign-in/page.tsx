"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </>
  )
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
