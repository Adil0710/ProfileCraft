import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import Howitworks from "@/components/Howitworks";

export default function Home() {
  return (
    <div className=" max-w-screen">
      <Hero/>
      <Howitworks/>
      <Features/>
    </div>
  );
}
