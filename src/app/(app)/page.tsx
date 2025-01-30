import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import Howitworks from "@/components/Howitworks";
import Showcase from "@/components/Showcase";
import BlurryBlob from "@/components/ui/blurry-blob";

export default function Home() {
  return (
    <div className=" max-w-screen">
      <Hero/>
      <Howitworks/>
      <BlurryBlob
  className=" rounded-xl opacity-45 right-0 h-56 w-56 top-1"
  firstBlobColor="bg-purple-400"
  secondBlobColor="bg-blue-400"
/>
      <Features/>
      <Showcase/>
    </div>
  );
}
