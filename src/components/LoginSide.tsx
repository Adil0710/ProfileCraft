import React from "react";
import Logo from "./Logo";
import { Music } from "lucide-react";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

function LoginSide() {
  return (
    <div className=" w-full inset-0 flex items-center z-30 justify-center h-full overflow-hidden">
      {/* Floating Boxes Container */}
      <div className="relative w-80 h-80">
        <div
          className="floating-box icon-shadow w-24 h-36 bg-[#d2efff] dark:bg-gradient-to-l from-black/20 to-[#d2efff] flex items-center justify-center rounded-2xl absolute animate-float-1"
          style={{ top: "-10%", left: "10%" }}
        >
          <Logo name="linkedin" size={50} />
        </div>
        <div
          className="floating-box  flex items-center justify-center rounded-2xl absolute animate-float-2"
          style={{ top: "-5%", right: "15%" }}
        >
          <Logo name="github" size={80} />
        </div>
        
        <div
          className="floating-box icon-shadow w-56 h-32 bg-green-200 dark:bg-gradient-to-l from-black/20 to-green-200 flex items-center justify-between gap-4 px-5 flex-row rounded-2xl absolute animate-float-4"
          style={{ bottom: "22%", right: "10%" }}
        >
          <div className="logo-container">
            <Logo name="spotify" size={40} />
            <div className="ripple"></div>

            {/* Music Chords */}
            <Music className="music-chord chord1" size={20} strokeWidth={3} />
            <Music className="music-chord chord2" size={20} strokeWidth={3} />
          </div>
          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-evenly w-full text-neutral-800">
            <IoPlaySkipBack className=" text-xl"  /> <IoPlay className=" text-3xl" />{" "}
            <IoPlaySkipForward className=" text-xl" />
          </div>
        </div>

        <div
          className="floating-box icon-shadow w-24 h-24 bg-[#ffe8f2] dark:bg-gradient-to-l from-black/10 to-[#ffe8f2] flex items-center justify-center rounded-2xl absolute animate-float-3"
          style={{ bottom: "-15%", right: "10%" }}
        >
          <Logo name="instagram" size={40} />
        </div>
        <div
          className="floating-box flex items-center justify-center rounded-2xl absolute animate-float-5"
          style={{ bottom: "-15%", right: "55%" }}
        >
          <Logo name="youtube" size={80} />
        </div>
      </div>
    </div>
  );
}

export default LoginSide;
