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

      <Features />

      <Showcase />
    </div>
  );
}
