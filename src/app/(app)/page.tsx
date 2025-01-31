import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import Howitworks from "@/components/Howitworks";
import Showcase from "@/components/Showcase";
import BlurryBlob from "@/components/ui/blurry-blob";

export default function Home() {
  return (
    <div className=" max-w-screen">
      <Hero />
      <Howitworks />
      <BlurryBlob
        className=" rounded-xl opacity-45 right-0 sm:h-56 sm:w-56 h-24 w-24 sm:-top-20 top-5"
        firstBlobColor="bg-purple-400"
        secondBlobColor="bg-blue-400"
      />
      <Features />
     
      <Showcase />
    </div>
  );
}
