import FAQ from "@/components/FAQ";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

import { HowWorks } from "@/components/HowWorks";

import PreviewGrid from "@/components/PreviewGrid";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <div className=" max-w-screen">
      <Hero />
      <PreviewGrid />
      <HowWorks />
      <Features />
      <Showcase />
      <FAQ/>
      <Footer/>
    </div>
  );
}
