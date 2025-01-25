import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ProfileCraft",
  description: "A Beautiful Link For Your Bio 🎉",
  keywords: ["Profilecraft", "Bento", "Social Media", "Profile", "Link", "Bio"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ProfileCraft",
    description: "A Beautiful Link For Your Bio 🎉",
    url: "https://profilecraft.vercel.app",
    siteName: "ProfileCraft",
    images: [
      {
        url: "/profilecraft.png",
        width: 800,
        height: 600,
        alt: "ProfileCraft Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfileCraft",
    description: "A Beautiful Link For Your Bio 🎉",
    images: ["/profilecraft.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
