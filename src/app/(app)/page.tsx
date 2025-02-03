import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import Howitworks from "@/components/Howitworks";
import PreviewGrid from "@/components/PreviewGrid";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <div className=" max-w-screen">
      <Hero />
      <Howitworks />
      <Features />
      <Showcase />
      <PreviewGrid/>
    </div>
  );
}
